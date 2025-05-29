// src/pages/Dashboard/components/RepaymentScenario.tsx
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

// 더미 기준치 (예: 낙인구간)
// 실제 데이터가 없으니 예시로 50% 고정
const knockInRatio = 50;

// 예시 “조기상환 충족 조건” 과 “만기상환 되는 경우” 값
const dummyScenarioData = [
  { period: '1차 조기상환', early: 90, maturity: 85 },
  { period: '2차 조기상환', early: 90, maturity: 85 },
  { period: '3차 조기상환', early: 85, maturity: 80 },
  { period: '4차 조기상환', early: 85, maturity: 80 },
  { period: '5차 조기상환', early: 80, maturity: 75 },
  { period: '만기',         early: knockInRatio, maturity: knockInRatio + 5 },
];

const RepaymentScenario: React.FC = () => {
  return (
    <DashboardItem title="만기 상환 시나리오">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={dummyScenarioData}
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
          {/* 조기상환 충족 조건 (검은선) */}
          <Line
            type="monotone"
            dataKey="early"
            name="조기상환 충족 조건"
            stroke="#000000"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          {/* 만기상환 되는 경우 (빨간선) */}
          <Line
            type="monotone"
            dataKey="maturity"
            name="만기상환 되는 경우"
            stroke="#FF0000"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardItem>
  );
};

export default RepaymentScenario;
