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
