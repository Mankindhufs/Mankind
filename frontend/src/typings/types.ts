import { ReactNode } from 'react';

// 기초 자산 추이 버튼 렌더링용 prop
export interface IndexButtonProp {
  [key: string]: ReactNode;
}

// 기초 자산 prop
export interface IndexProp {
  name: string;
  prices: {
    close: number;
    date: string;
  }[];
  symbol: string;
}

// 그래프 간격 조정
export interface ParamsTick {
  min: number;
  max: number;
  interval?: number;
}

// pdf 추출값
// export interface VerifyData {
//   indices: string[];
//   maxLossPrice: number;
//   knockInRatio: number;
//   evaluationDate: string;
//   maturityDate: string;
//   earlyRedeemDates: string[];
//   earlyRedeemConditions: number[];
//   earlyRedeemYields: number[];
// }

// 회차별 키값
export type roundKey = 'first' | 'second' | 'third' | 'fourth' | 'fifth';

// pdf 추출 임의값
export interface PdfValue {
  기초자산: string;
  낙인구간: number;
  만기일: string;
  만기평가일: string;
  위험등급: number;
  손실조건버전: string;
  자동조기상환: Record<roundKey, Round>;
  종목명: string;
  최대손실만기조건비율: number;
}

// 자동조기상환
export interface Round {
  자동조기상환평가일: string;
  자동조기상환성립조건: number;
  자동조기상환수익률: number;
}
