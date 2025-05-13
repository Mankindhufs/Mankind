import IndexChart from './components/IndexChart';
import RepaymentScenario from './components/RepaymentScenario';
import RevenueStructure from './components/RevenueStructure';
import Sidebar from './components/Sidebar';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-12 grid-rows-4 h-[calc(100vh-64px)] gap-4 p-5'>
      {/* 왼쪽 사이드바 */}
      <div className='col-span-3 row-start-1 row-end-5'>
        <Sidebar />
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
  );
};

export default Dashboard;
