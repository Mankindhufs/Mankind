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


const RevenueStructure: React.FC<{ onOpenModal?: () => void }> = ({ onOpenModal }) => {
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

      {/*
        main 영역이 곧 children 위치이므로,
        여기서부터 flex flex-col h-full 구조를 줘서
        "차트 영역" + "버튼" 을 쌓는다.
      */}
      <div className="flex flex-col h-full">
        {/* 1) 차트: 높이를 200px로 줄이고, flex-1을 줘서 남은 공간을 최대한 채우도록 */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis domain={[50, 'dataMax']} unit="%" />
              <Tooltip formatter={(val: number) => `${val.toFixed(2)}%`} />
              <Legend 
                verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0 }} 
                />


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
        </div>

        {/* onOpenModal이 전달된 경우에만 버튼을 렌더 */}
        {onOpenModal && (
          <button
            onClick={onOpenModal}
            className="mt-2 px-4 py-2 bg-mainGreen text-white rounded-md self-center"
          >
            📊 크게 보기
          </button>
        )}

          {/* 2) 버튼: flex-col 하단에, 가운데 정렬(self-center) + 위쪽 여백(mt-2) */}
          {/* <button
            onClick={onOpenModal}
            className="mt-2 px-4 py-2 bg-mainGreen text-white rounded-md self-center"
          >
            📊 크게 보기
          </button> */}
      </div>
    </DashboardItem>
  );
};

export default RevenueStructure;
