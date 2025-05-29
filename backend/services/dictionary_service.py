import requests
import xml.etree.ElementTree as ET
from config import DICTIONARY_API_KEY
from html import unescape
import re

def strip_html_tags(text):
    return re.sub(r"<[^>]+>", "", text)

def search_financial_term(keyword):
    url = "https://api.seibro.or.kr/openapi/service/FnTermSvc/getFinancialTermMeaning"
    params = {
        "serviceKey": DICTIONARY_API_KEY,
        "term": keyword
    }

    response = requests.get(url, params=params)
    if response.status_code != 200:
        return {"error": "API request failed"}

    try:
        root = ET.fromstring(response.text)
        items = root.findall(".//item")

        for item in items:
            name = item.findtext("fnceDictNm")
            if name and keyword.strip() in name.strip():
                raw_desc = item.findtext("ksdFnceDictDescContent")
                desc_html = unescape(raw_desc or "")
                clean_text = strip_html_tags(desc_html).strip()
                return {
                    "term": name.strip(),
                    "definition": clean_text
                }

        return {"error": "No exact match found"}

    except Exception as e:
        return {"error": f"Parsing error: {str(e)}"}
