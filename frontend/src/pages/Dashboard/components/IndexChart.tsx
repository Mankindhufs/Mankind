import { useState } from 'react';
import DashboardItem from './DashboardItem';
import IndexChartButton from './IndexChartButton';
import IndexChartItem from './IndexChartItem';
import { IndexButtonProp } from '../../../typings/types';
import { useGetIndex } from '../hooks/useGetIndex';
import Spinner from '../../../components/Spinner';

const IndexChart = () => {
  const [isClicked, setIsClicked] = useState<string>('KOSPI 200');
  const { kospi, sp, euro, isPending, isError } = useGetIndex();

  // 버튼 이름, key
  const buttonData = [
    { name: 'KOSPI 200', id: 1 },
    { name: 'EURO STOXX 50', id: 2 },
    { name: 'S&P 500', id: 3 },
  ];

  // 버튼에 따라 다른 컴포넌트 렌더링
  const indexItem: IndexButtonProp = {
    'KOSPI 200': kospi && <IndexChartItem data={kospi} />,
    'EURO STOXX 50': sp && <IndexChartItem data={sp} />,
    'S&P 500': euro && <IndexChartItem data={euro} />,
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

      <div className='w-full h-[calc(100%-15%)] flex items-center justify-center'>
        {isPending ? (
          <Spinner />
        ) : isError ? (
          <p className='text-grayBorder'>데이터를 불러올 수 없습니다.</p>
        ) : (
          isClicked && <>{indexItem[isClicked]}</>
        )}
      </div>
    </DashboardItem>
  );
};

export default IndexChart;
