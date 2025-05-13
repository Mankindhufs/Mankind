import { useState } from 'react';
import DashboardItem from './DashboardItem';
import IndexChartButton from './IndexChartButton';
import IndexChartItem from './IndexChartItem';
import { IndexItemProp } from '../../../typings/types';
import { useGetIndex } from '../hooks/useGetIndex';

// 임의값
const data1 = [
  { name: 'Page A', value: 4000 },
  { name: 'Page B', value: 3000 },
  { name: 'Page C', value: 2000 },
  { name: 'Page D', value: 2780 },
  { name: 'Page E', value: 1890 },
  { name: 'Page F', value: 2390 },
  { name: 'Page G', value: 3490 },
];

const data2 = [
  { name: 'Page A', value: 2400 },
  { name: 'Page B', value: 1398 },
  { name: 'Page C', value: 9800 },
  { name: 'Page D', value: 3908 },
  { name: 'Page E', value: 4800 },
  { name: 'Page F', value: 3800 },
  { name: 'Page G', value: 4300 },
];

const data3 = [
  { name: 'Page A', value: 2400 },
  { name: 'Page B', value: 2210 },
  { name: 'Page C', value: 2290 },
  { name: 'Page D', value: 2000 },
  { name: 'Page E', value: 2181 },
  { name: 'Page F', value: 2500 },
  { name: 'Page G', value: 2100 },
];

const IndexChart = () => {
  const [isClicked, setIsClicked] = useState<string>('KOSPI 200');
  const { data } = useGetIndex();
  console.log(data);

  // 버튼 이름, key
  const buttonData = [
    { name: 'KOSPI 200', id: 1 },
    { name: 'EURO STOXX 50', id: 2 },
    { name: 'S&P 500', id: 3 },
  ];

  // 버튼에 따라 다른 컴포넌트 렌더링
  const indexItem: IndexItemProp = {
    'KOSPI 200': <IndexChartItem data={data1} />,
    'EURO STOXX 50': <IndexChartItem data={data2} />,
    'S&P 500': <IndexChartItem data={data3} />,
  };

  // 클릭 시 active 상태 변경
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setIsClicked(name);
  };

  return (
    <DashboardItem title='기초 자산 추이'>
      {/* 버튼 네비게이션 */}
      <nav className='flex gap-1 items-start justify-end h-[15%]'>
        {buttonData.map((item) => (
          <IndexChartButton
            key={item.id}
            value={item.name}
            onClickFunction={handleClickButton}
            active={isClicked}
          />
        ))}
      </nav>

      {isClicked && (
        <div className='w-full h-[calc(100%-15%)]'>{indexItem[isClicked]}</div>
      )}
    </DashboardItem>
  );
};

export default IndexChart;
