import openai
import os
import json
from dotenv import load_dotenv

load_dotenv()
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_scenario_from_text(text):
    prompt = (
        '''
        다음은 파생상품 약관입니다. 이 내용을 바탕으로 손실위험 시나리오를 아래 JSON 형식에 맞게 생성해주세요.

        출력 예시:
        {
        
        "details": [
            {"month": 6, "price": 950, "threshold": 900, "passed": true},
            {"month": 12, "price": 920, "threshold": 900, "passed": true},
            {"month": 18, "price": 870, "threshold": 850, "passed": true},
            ...
        ]
        }

        조건:
        - 평가 시점은 6개월마다 총 6회이며, 정확히 6, 12, 18, 24, 30, 36개월입니다.
        - GPT가 임의로 5, 11, 17 등으로 추론하지 말고, 약관 기준 월을 그대로 사용해주세요.
        - 출력 예시에 적힌 price, threshold, passed 값을 그대로 따라하지 말고, 업로드 된 pdf에서 직접 찾아서 알맞은 값을 적으세요.
        - 함수 코드 없이 JSON만 반환해주세요.
        - Markdown 코드블록 없이 순수 JSON 텍스트로 반환해주세요.

        약관:
        ''' + text[:1500]
    )


    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "당신은 금융 파생상품 분석에 능숙한 JSON 데이터 분석가입니다."},
                {"role": "user", "content": prompt}
            ],
            temperature=0,
            max_tokens=1000
        )

        gpt_response = response.choices[0].message.content
        print("[GPT 응답 결과]:\n", gpt_response)

        try:
            parsed_json = json.loads(gpt_response)
            return parsed_json
        except json.JSONDecodeError as decode_err:
            return {
                "error": f"JSON 파싱 실패: {str(decode_err)}",
                "raw_response": gpt_response
            }

    except Exception as e:
        return {"error": f"OpenAI 호출 중 오류 발생: {str(e)}"}
