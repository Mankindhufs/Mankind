import fitz     # pip install PyMuPDF
import re
import argparse

def isolate_table_region(text: str) -> str:
    """
    text 안에서 첫 번째 테이블 헤더 '항    목' / '내    용' 을 찾아
    그 헤더가 끝나는 지점부터 뒤의 모든 내용을 잘라 반환.
    """
    # '항' + 공백 + '목', 그 뒤 0~20자 이내에 줄바꿈 포함 '내' + 공백 + '용' 패턴
    m = re.search(r"항\s*목[\s\S]{0,20}?내\s*용", text)
    if m:
        return text[m.end():]
    else:
        return text

def extract_table_fields(text: str, labels: list[str]) -> dict[str,str]:
    """
    labels 리스트에 있는 각 라벨(label)부터
    다음 라벨이 시작되기 전까지의 모든 텍스트를 한 덩어리로 잘라 반환
    """
    out: dict[str,str] = {}
    for i, label in enumerate(labels):
        idx = text.find(label)
        if idx == -1:
            out[label] = None
            continue
        start = idx + len(label)
        end = len(text)
        # 다음 라벨이 시작되는 지점까지 자르기
        for next_label in labels[i+1:]:
            j = text.find(next_label, start)
            if j != -1 and j < end:
                end = j
        snippet = text[start:end].strip()
        out[label] = snippet or None
    return out

def extract_fields(pdf_path: str) -> dict[str,str]:
    doc = fitz.open(pdf_path)
    results: dict[str,str] = {}

    # 1) 6~8페이지(0-based 5,6,7) 통합 텍스트
    pages_text = ""
    for p in (5,6,7):
        if p < doc.page_count:
            pages_text += doc[p].get_text()

    # 2) "(2) 모집 또는 매출의 개요" 뒤만 떼어내기 (테이블 섹션 시작점)
    if "(2) 모집 또는 매출의 개요" in pages_text:
        pages_text = pages_text.split("(2) 모집 또는 매출의 개요", 1)[1]

    # 3) 테이블 헤더 '항    목'/'내    용' 이후만 남기기
    table_region = isolate_table_region(pages_text)

    # 4) 표 라벨들 정의 & 내용 추출
    table_labels = [
        "종목명", "기초자산", "청약기간",
        "납입일", "배정일", "환불일",
        "발행일", "만기일"
    ]
    results.update(extract_table_fields(table_region, table_labels))

    # 5) 고난도금융투자상품 문구 전체 추출
    m = re.search(r"\([^)]*?\)\s*고난도금융투자상품", table_region)
    results["고난도금융투자상품"] = m.group(0).strip() if m else None

    # 6) (1) 상황별 손익구조 → 13페이지(0-based 12)에서 "(2)" 전까지
    if doc.page_count > 12:
        t13 = doc[12].get_text()
        part = t13.split("(1) 상황별 손익구조",1)
        if len(part)>1:
            results["(1) 상황별 손익구조"] = part[1].split("(2)",1)[0].strip()
        else:
            results["(1) 상황별 손익구조"] = None
    else:
        results["(1) 상황별 손익구조"] = None

    # 7) (5) 최대이익액 및 최대손실액 → 17~18페이지(16,17)에서 "(6)" 전까지
    t17_18 = ""
    for p in (16,17):
        if p < doc.page_count:
            t17_18 += doc[p].get_text()
    part5 = t17_18.split("(5) 최대이익액 및 최대손실액",1)
    if len(part5)>1:
        results["(5) 최대이익액 및 최대손실액"] = part5[1].split("(6)",1)[0].strip()
    else:
        results["(5) 최대이익액 및 최대손실액"] = None

    # 8) 중도상환 신청방법 및 단, 중도상환 가격 산정시 단락
    results["중도상환 신청방법"] = None
    results["단, 중도상환 가격 산정시 단락"] = None
    for p in range(doc.page_count):
        txt = doc[p].get_text().splitlines()
        # 신청방법
        if results["중도상환 신청방법"] is None:
            buf=[]; cap=False
            for L in txt:
                if "중도상환 신청방법" in L: cap=True
                if cap:
                    if not L.strip(): break
                    buf.append(L)
            if buf:
                results["중도상환 신청방법"] = "\n".join(buf).strip()
        # 단가산정
        if results["단, 중도상환 가격 산정시 단락"] is None:
            buf=[]; cap=False
            for L in txt:
                if "단, 중도상환 가격 산정시" in L: cap=True
                if cap:
                    if not L.strip(): break
                    buf.append(L)
            if buf:
                results["단, 중도상환 가격 산정시 단락"] = "\n".join(buf).strip()
        if results["중도상환 신청방법"] and results["단, 중도상환 가격 산정시 단락"]:
            break

    return results

def main():
    parser = argparse.ArgumentParser(
        description="PDF에서 12개 항목(종목명~만기일, 고난도금융투자상품, (1),(5), 중도상환 등)을 추출합니다."
    )
    parser.add_argument(
        "pdf_path",
        help="분석할 PDF 파일 경로 (extract.py와 같은 폴더에 있으면 파일명만)"
    )
    args = parser.parse_args()

    data = extract_fields(args.pdf_path)
    for key, val in data.items():
        print(f"--- {key} ---")
        print(val or "해당 항목 없음")
        print()

if __name__ == "__main__":
    main()

