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

// 예시 5개 조기상환 수익률 데이터 (수익구조 분석 차트)
const dummyRevenueData = [
  { period: '1차 조기상환', yield: 104.65 },
  { period: '2차상환', yield: 109.30 },
  { period: '3차상환', yield: 113.95 },
  { period: '4차상환', yield: 118.60 },
  { period: '5차상환', yield: 123.25 },
];

const RevenueStructure: React.FC = () => {
  return (
    <DashboardItem title="수익구조 분석 차트">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={dummyRevenueData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
      <YAxis
        domain={[50, 'dataMax']}   // 50%부터 시작해서 데이터 최대값까지
        unit="%"
      />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
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
