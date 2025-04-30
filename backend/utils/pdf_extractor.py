import fitz  # PyMuPDF

def extract_text_from_pdf(file_path):
    """
    주어진 PDF 파일 경로에서 전체 텍스트를 추출합니다.
    
    :param file_path: 저장된 PDF의 전체 경로
    :return: 문자열 형태의 전체 텍스트
    """
    text = ""

    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"[ERROR] PDF 텍스트 추출 실패: {e}")
        return ""

    return text

# text_path = "./신한_코스피200커버드콜_상품설명서.pdf"

# extract_text_from_pdf(text_path)


if __name__ == "__main__":
    text_path = "/Users/Star1/Desktop/Mankind/backend/utils/신한_투자설명서_26349호.pdf"
    
    extracted = extract_text_from_pdf(text_path)
    print(extracted)                # <- 여기를 추가
    print(f"총 {len(extracted)}자 추출됨")  # 선택사항: 길이 확인용
