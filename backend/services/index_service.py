import yfinance as yf
import datetime
from datetime import timedelta
import pandas as pd
import time

index_name_map = {
    "^GSPC": "S&P 500",
    "^STOXX50E": "EURO STOXX 50",
    "^KS200": "KOSPI 200"
}

def get_index_data(symbol, period="3mo", interval="1d"):
    # 고정: 최근 100일
    end_date = datetime.datetime.today()
    start_date = end_date - timedelta(days=100)
    start_str = start_date.strftime("%Y-%m-%d")
    end_str = end_date.strftime("%Y-%m-%d")

    print(f"{symbol} 데이터 요청 중")

    # 재시도 로직 포함
    for attempt in range(3):
        try:
            df = yf.download(
                symbol,
                start=start_str,
                end=end_str,
                interval=interval,
                threads=False
            )
            if not df.empty:
                break  # 성공 시 루프 종료
        except Exception as e:
            if "429" in str(e) or "Too Many Requests" in str(e):
                print("Rate limited (429). 10초 대기")
                time.sleep(10)
            else:
                print(f"{symbol} 요청 중 오류: {e}")
                raise e
        time.sleep(3)  # polite delay between retries

    if df.empty:
        raise Exception(f"{symbol}에 대한 데이터를 가져올 수 없습니다.")

    df.index = pd.to_datetime(df.index)

    prices = [
        {
            "date": idx.strftime("%Y-%m-%d"),
            "close": float(round(row["Close"], 2))
        }
        for idx, row in df.iterrows()
    ]

    return {
        "symbol": str(symbol),
        "name": index_name_map.get(symbol, symbol),
        "prices": prices
    }
