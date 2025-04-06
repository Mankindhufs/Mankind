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
