import os
import json
import fitz
import re
from datetime import datetime

def generate_scenario_from_text(pdf_path):
    doc = fitz.open(pdf_path)
    
    results = {}

    # 1) 6~8p 텍스트 합치기 (0-based 5,6,7)
    pages_6_8 = ""
    for idx in (5, 6, 7):
        if idx < doc.page_count:
            pages_6_8 += doc[idx].get_text()

    # 2) 해당 페이지 범위 안에서, '(2) 모집 또는 매출의 개요' 뒤만 남기기
    if "(2) 모집 또는 매출의 개요" in pages_6_8:
        pages_6_8 = pages_6_8.split("(2) 모집 또는 매출의 개요", 1)[1]
        
    # +) 만기평가일 추출
    page_20_21 = ""
    for idx in (19, 20):
        if idx < doc.page_count:
            page_20_21 += doc[idx].get_text()
            
    match = re.search(r"○ 만기평가일\s*:\s*(\d{4}년\s*\d{2}월\s*\d{2}일)", page_20_21)
    if match:
        maturity_date_clean = match.group(1).replace(" ", "") # 공백 제거 (2028년04월25일)
        maturity_date_obj = datetime.strptime(maturity_date_clean, "%Y년%m월%d일")
        formatted_date = maturity_date_obj.strftime("%Y-%m-%d")
        results["만기평가일"] = formatted_date
    
    
    
    labels = ["종목명", "기초자산", "만  기  일"]
    
    for label in labels: 
        m = re.search(rf"{label}\s*(.+)", pages_6_8)
        
        if not m:
            continue
        
        extracted = m.group(1).strip()
                
        if label == "종목명":
            results[label] = extracted
            # 위험등급 추출
            risk_match = re.search(r"\([^)]+위험\)\s*[^\n]+금융투자상품", pages_6_8, re.DOTALL)
            if risk_match:
                results["위험등급"] = risk_match.group(0).strip()

        elif label == "만  기  일":
            try:
                extracted_clean = extracted.replace(" ", "")
                date_obj = datetime.strptime(extracted_clean, "%Y년%m월%d일")
                results["만기일"] = date_obj.strftime("%Y-%m-%d")
            except ValueError:
                results["만기일"] = extracted
        else:
            results[label] = extracted

# ───────────────────────────────────────────────
     # 3) 17~21p 범위에서 '나. 자동조기상환' 섹션만 떼오기
    pages_17_21 = "".join(
        doc[p].get_text() for p in range(16, 21)
        if p < doc.page_count
    )
    # results['자동조기상환'] = pages_17_21 
    #   26394호에서 에러나옴 -> 해당 페이지는 잘 뽑힘
    
    if "나. 자동조기상환" in pages_17_21:
        section = pages_17_21.split("나. 자동조기상환", 1)[1]
    else:
        section = pages_17_21 #없으면 그냥 전체 페이지로 퉁치기
        
    # results['자동조기상환'] = section
        #   26394호에서 에러나옴 -> 해당 페이지는 잘 뽑힘

        # 섹션 끝 자를 마커
    for end_marker in ("다. 만기상환", "○ 자동조기상환평가가격"):
            #만에 하나 21p 범위 내에 '다. 만기상환'이 없다면, 예방책으로
                # '○ 자동조기상환평가가격' 을 end_marker 로 지정
        if end_marker in section:
            section = section.split(end_marker, 1)[0]
                    #->이렇게 진짜 사용하고 싶은 부분 잘라낸 것임ㅇㅇ
                    
    # results['자동조기상환'] = section
        # -> "다. 만기상환"을 end_marker로 이전까지 잘뽑힘
    
    
    # 4) 잘라낸 section에서 (차수, 조기상황발생조건 %) 뽑기
        # 예: "1차 … 최초기준가격의 90% 이상인 경우"
    triggers = re.findall(
        r"(\d차)[^\n]*?최초기준가격의\s*([\d.]+%)",
        section)


    # 5) 평가일/상환금액 section에서 (차수, 날짜, 상환금액 %) 뽑기 
    # 예: "1차 2025년 09월 25일 액면금액 × 104.65%"
    schedule_matches = re.findall(
        r"(\d차)\s+"                                   # 1) 차수 (예: “1차”)
        r"(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)"           # 2) 평가일 (예: “2025년 10월 17일”)
        r"(?:\s+[^\n]+?)?"                             # 3) (선택) 조건 칸 전체를 비집고 지나감
        r"\s+액면금액\s*[×x]\s*([\d.]+%)",             # 4) 액면금액×지분% (예: “102.85%”)
        section
    )
        # schedule_matches → [("1차","2025년 10월 17일","102.85%"), ...]

    # results["자동조기상환"] = [triggers, schedule_matches]

    # 6) triggers 와 schedule_matches 를 같은 차수끼리 매칭
    auto_redemption = {}
    for t_id, t_pct in triggers:
        for s_id, s_date, s_pay in schedule_matches:
            if s_id == t_id:
                try:
                    s_date_clean = s_date.replace(" ", "")
                    s_date_obj = datetime.strptime(s_date_clean, "%Y년%m월%d일")
                    formatted_s_date = s_date_obj.strftime("%Y-%m-%d")
                except ValueError:
                    formatted_s_date = s_date # 변환 실패하면 원본 사용
                
                auto_redemption[t_id] = {
                "자동조기상환성립조건": int(t_pct.replace("%", "")),
                "자동조기상환평가일": formatted_s_date,
                "자동조기상환수익률": float(s_pay.replace("%", ""))
                }



    results["자동조기상환"] = auto_redemption


    # ───────────────────────────────────────────────
    # 7) "(5) 최대이익액 및 최대손실액" 섹션에서 '65%' 같은 퍼센트만 추출
    #  4~20p 텍스트 중에서
    #   → (5) 최대이익액 및 최대손실액 이후부터 → "2. 권리의 내용" 전까지
    
    # all_text = "".join(page.get_text() for page in doc)
    
    pages_5_21 = "".join(
        doc[p].get_text() for p in range(4, 21)
        if p < doc.page_count
    )

    #2가지 버전으로 나눠서 처리했음.
        #ver1은 그냥 만기일 기준으로만 % 제한이 있을 때. = '최대손실조건비율' 임의 정의
                # 예) 만기일 기준 최초기준가격의 50%이상이어야한다
        #ver2는 만기일 기준으로도 % 제한이 있고,  ='최대손실 만기조건 비율' 임의 정의
        #   추가로 상품 전체 기간동안 '한번이라도 떨어지면 그만큼 손실나는' % 제한있을 때. ='낙인구간' 임의로 정의
                # 예) 만기일 기준 최초기준가격의 60%이상이어야 하고, 전체 기간동안 50% 미만으로 한번도 떨어지면 안된다
    
    if "(5) 최대이익액 및 최대손실액" in pages_5_21:
        max_sec = pages_5_21.split("(5) 최대이익액 및 최대손실액", 1)[1]
        if "2. 권리의 내용" in max_sec:
            max_sec = max_sec.split("2. 권리의 내용", 1)[0]

        # 7-1) ver2 판별: '최초기준가격의 XX% 미만' 패턴이 있으면 ver2
        m50 = re.search(r"최초기준가격[^%]*?([\d.]+)%\s*미만", max_sec)
        if m50:
            results["손실조건버전"] = "ver2"
            # (a) 낙폭 기준 비율
            results["낙인구간"] = int(m50.group(1))
            # (b) 만기조건 비율
            m75 = re.search(r"만기평가가격[^%]*?최초기준가격의\s*([\d.]+)%", max_sec)
            results["최대손실만기조건비율"] = int(m75.group(1)) if m75 else None

        else:
            # 7-2) ver1: '만기평가가격이 최초기준가격의 XX% 보다 작은' 패턴만
            m1 = re.search(r"만기평가가격이\s*최초기준가격의\s*([\d.]+)%", max_sec)
            if m1:
                results["손실조건버전"] = "ver1"
                results["최대손실조건비율"] = float(m1.group(1))
            else:
                # 둘 다 못 찾으면 None 처리
                results["손실조건버전"] = None
                results["최대손실조건비율"] = None
                results["낙인구간"] = None
                results["최대손실만기조건비율"] = None
    else:
        results["손실조건버전"] = None
        results["최대손실조건비율"] = None
        results["낙인구간"] = None
        results["최대손실만기조건비율"] = None

    # if "(5) 최대이익액 및 최대손실액" in pages_5_21:
    #     max_sec = pages_5_21.split("(5) 최대이익액 및 최대손실액", 1)[1]
    #     if "2. 권리의 내용" in max_sec:
    #         max_sec = max_sec.split("2. 권리의 내용", 1)[0]
    
    #     # '최초기준가격의 65% 보다 작은' 에서 65%만 캡처
    #     m = re.search(r"만기평가가격이\s*최초기준가격의\s*([\d.]+)%", max_sec)
    #     results["최대손실조건비율"] = m.group(1) + "%" if m else None
    # else:
    #     results["최대손실조건비율"] = None
			# -> 이렇게하면 2가지 버전 반영 몸ㅅ함


    return results
