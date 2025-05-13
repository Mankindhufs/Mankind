from flask import Flask
from flask_cors import CORS
from routes.index_api import index_bp
from routes.scenario_api import scenario_bp
import os

app = Flask(__name__)
CORS(app)

# 파일 업로드 경로 설정
app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# 라우터 등록 (Blueprint)
app.register_blueprint(index_bp, url_prefix="/api/index")
app.register_blueprint(scenario_bp, url_prefix="/api/scenario")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
