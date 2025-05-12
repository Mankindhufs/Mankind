from flask import Blueprint, jsonify, request
from services.index_service import get_index_data
import time

index_bp = Blueprint("index", __name__)

@index_bp.route("/", methods=["GET"])
def get_index():
    symbols_param = request.args.get("symbols")
    period = request.args.get("period", "3mo")
    interval = request.args.get("interval", "1d")

    if not symbols_param:
        return jsonify({"error": "No symbols provided"}), 400

    symbols = symbols_param.split(",")
    results = []

    for symbol in symbols:
        try:
            data = get_index_data(symbol.strip(), period, interval)
            results.append(data)
        except Exception as e:
            results.append({
                "symbol": symbol,
                "error": str(e)
            })
        time.sleep(2)  # rate limit 대응

    return jsonify({"results": results})
