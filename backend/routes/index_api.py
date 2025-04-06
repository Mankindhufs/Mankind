from flask import Blueprint, jsonify, request
from services.index_service import get_index_data

index_bp = Blueprint("index", __name__)

@index_bp.route("/<symbol>", methods=["GET"])
def get_index(symbol):
    period = request.args.get("period", "3mo")
    interval = request.args.get("interval", "1d")
    try:
        data = get_index_data(symbol, period, interval)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
