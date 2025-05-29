from flask import Blueprint, request, jsonify
from services.dictionary_service import search_financial_term

dictionary_bp = Blueprint("dictionary", __name__)

@dictionary_bp.route("/", methods=["GET"])
def dictionary_lookup():
    keyword = request.args.get("keyword")
    if not keyword:
        return jsonify({"error": "No keyword provided"}), 400
    result = search_financial_term(keyword)
    return jsonify(result)
