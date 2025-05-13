from flask import Blueprint, request, jsonify, current_app
import os
from utils.file_handler import save_uploaded_file
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

    # 3. 손실위험 시나리오 정보 추출
    try:
        result = generate_scenario_from_text(saved_path)
        return jsonify({"scenario_result": result})
    except Exception as e:
        return jsonify({"error": f"PDF 처리 중 오류: {str(e)}"}), 500
