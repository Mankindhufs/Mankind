import { getFileValue } from '../../utils/savedFile';
import IndexChart from './components/IndexChart';
import RepaymentScenario from './components/RepaymentScenario';
import RevenueStructure from './components/RevenueStructure';
import Sidebar from './components/Sidebar';

const Dashboard = () => {
  const data = getFileValue();

  return (
    <>
      {data ? (
        <div className='grid grid-cols-12 grid-rows-4 h-[calc(100vh-64px)] gap-4 p-5'>
          {/* 왼쪽 사이드바 */}
          <div className='col-span-3 row-start-1 row-end-5'>
            <Sidebar props={data} />
          </div>

          {/* 지수 차트 */}
          <div className='col-span-9 row-start-1 row-end-3'>
            <IndexChart />
          </div>

          {/* 수익구조 분석 차트 */}
          <div className='col-span-4 row-start-3 row-end-5'>
            <RevenueStructure />
          </div>

          {/* 만기 상환 시나리오 */}
          <div className='col-span-5 row-start-3 row-end-5'>
            <RepaymentScenario />
          </div>
        </div>
      ) : (
        <div className='absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full text-center text-grayBorder'>
          데이터를 불러올 수 없습니다.
        </div>
      )}
    </>
  );
};

export default Dashboard;
