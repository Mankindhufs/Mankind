// PDF 결과를 react-query로 가져오는 훅
// 일단 임의값으로 설정해두었습니다. 잘몰라서요.. 공부해가겠습니다ㅠㅠ

// src/pages/VerifyPage/hooks/useVerifyData.ts
import { useQuery } from '@tanstack/react-query';

export interface VerifyData {
  indices: string[];
  maxLossPrice: number;
  knockInRatio: number;
  evaluationDate: string;
  maturityDate: string;
  earlyRedeemDates: string[];
  earlyRedeemConditions: number[];
  earlyRedeemYields: number[];
}

export default function useVerifyData() {
  return useQuery<VerifyData>({
    queryKey: ['verifyData'],
    queryFn: async () => ({
      indices: ['EURO STOXX 50', '코스피 200', 'S&P 500'],
      maxLossPrice: 75,
      knockInRatio: 50,
      evaluationDate: '2028년 03월 24일',
      maturityDate: '만기평가일(불포함) 이후 3영업일',
      earlyRedeemDates: [
        '2025년 09월 25일',
        '2026년 03월 25일',
        '2026년 09월 23일',
        '2027년 03월 25일',
        '2027년 09월 24일',
      ],
      earlyRedeemConditions: [90, 90, 85, 85, 80],
      earlyRedeemYields:     [104.65, 109.30, 113.95, 118.60, 123.25],
    }),
    enabled: true,
  });
}
