// src/pages/Dashboard/components/RevenueStructure.tsx
import React from 'react';
import DashboardItem from './DashboardItem';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { getFileValue } from '../../../utils/savedFile';
import { PdfValue, RoundKey } from '../../../typings/types';



// // 예시 5개 조기상환 수익률 더미 데이터 (수익구조 분석 차트)
// const dummyRevenueData = [
//   { period: '1차 조기상환', yield: 104.65 },
//   { period: '2차상환', yield: 109.30 },
//   { period: '3차상환', yield: 113.95 },
//   { period: '4차상환', yield: 118.60 },
//   { period: '5차상환', yield: 123.25 },
// ];

const RevenueStructure: React.FC = () => {
  const file = getFileValue() as PdfValue | null;
  if (!file) {
    return (
      <DashboardItem title="수익구조 분석 차트">
        <div className="text-center text-gray-500">데이터가 없습니다.</div>
      </DashboardItem>
    );
  }

  // 1~5차 조기상환 수익률 데이터로 매핑
  const data = (['1차', '2차', '3차', '4차', '5차'] as RoundKey[]).map(
    (key) => ({
      period: `${key} 조기상환`,
      yield: file.자동조기상환[key].자동조기상환수익률,
    })
  );



  return (
    <DashboardItem title="수익구조 분석 차트">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis domain={[50, 'dataMax']} unit="%" />
          <Tooltip formatter={(val: number) => `${val.toFixed(2)}%`} />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="yield"
            name="수익률"
            stroke="#000000"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            />
        </LineChart>
      </ResponsiveContainer>
    </DashboardItem>
  );
};

export default RevenueStructure;
