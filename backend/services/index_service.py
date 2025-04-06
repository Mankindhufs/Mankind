import yfinance as yf
import datetime
from datetime import timedelta
import pandas as pd

def get_index_data(symbol, period="3mo", interval="1d"):
    end_date = datetime.datetime.today()

    if period.endswith("mo"):
        months = int(period.replace("mo", ""))
        start_date = end_date - timedelta(days=30 * months)
    elif period.endswith("y"):
        years = int(period.replace("y", ""))
        start_date = end_date - timedelta(days=365 * years)
    else:
        start_date = end_date - timedelta(days=90)

    # 데이터 다운로드
    df = yf.download(
        symbol,
        start=start_date.strftime("%Y-%m-%d"),
        end=end_date.strftime("%Y-%m-%d"),
        interval=interval
    )

    df.index = pd.to_datetime(df.index)

    prices = [
        {
            "date": index.strftime("%Y-%m-%d"),
            "close": float(round(row["Close"], 2))
        }
        for index, row in df.iterrows()
    ]

    return {
        "symbol": str(symbol),
        "name": str(symbol),
        "prices": prices
    }
