from flask import Blueprint, request, jsonify, current_app
import os

# 유틸 함수 & 서비스 불러오기
from utils.file_handler import save_uploaded_file
from utils.pdf_extractor import extract_text_from_pdf
from services.scenario_service import generate_scenario_from_text

# 블루프린트 생성
scenario_bp = Blueprint("scenario", __name__)

@scenario_bp.route("/upload", methods=["POST"])
def upload_pdf():
    # 1. 업로드된 파일 체크
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400

    pdf_file = request.files['pdf']

    # 2. 파일 저장
    saved_path = save_uploaded_file(pdf_file, current_app.config["UPLOAD_FOLDER"])

    # 3. PDF에서 텍스트 추출(pdf_extractor.py 호출)
    extracted_text = extract_text_from_pdf(saved_path)

    # 4. 텍스트 기반 시나리오 생성 (OpenAI 호출 or 더미)
    scenario = generate_scenario_from_text(extracted_text)

    # 5. JSON 응답 반환
    return jsonify({
        "scenario_result": scenario,
        "filename": pdf_file.filename,
        "text_snippet": extracted_text[:300]  # 미리보기용
    })
