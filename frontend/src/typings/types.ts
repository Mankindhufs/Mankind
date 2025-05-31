import { ChangeEvent, ReactNode } from 'react';

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
export type RoundKey = '1차' | '2차' | '3차' | '4차' | '5차';

// pdf 추출 임의값
export interface PdfValue {
  기초자산: string;
  낙인구간: number;
  만기일: string;
  만기평가일: string;
  위험등급: string;
  손실조건버전: string;
  자동조기상환: Record<RoundKey, Round>;
  종목명: string;
  최대손실만기조건비율: number;
}

// 자동조기상환
export interface Round {
  자동조기상환평가일: string;
  자동조기상환성립조건: number;
  자동조기상환수익률: number;
}

// /verify inputProps
export interface InputProps {
  name?: string;
  label: string;
  value?: string | number;
  readOnly?: boolean;
  suffix?: string; // 뒤에 % 같은 단위 붙이고 싶을 때
  hideLabel?: boolean; // '기초지수' 섹션에서는 라벨 가리기
  inputClassName?: string;
  plainText?: boolean; //만기일은 박스 없이 텍스트만 렌더링
  prefix?: string; // 액면금액 텍스트 추가
  isEditing?: boolean;
  datetype?: boolean;
  onChangeFunction?: (
    e?: ChangeEvent<HTMLInputElement>,
    name?: string,
    date?: Date | null,
  ) => void;
}

// 대시보드 사이드바 데이터
export interface SidebarProps {
  종목명: string;
  위험등급: string;
  만기평가일: string;
  만기일: string;
}

// 단어검색 결과
export interface WordModalProps {
  term: string;
  definition: string;
}
