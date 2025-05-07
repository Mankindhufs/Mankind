import { Outlet, useLocation } from 'react-router-dom';
import Logo from './assets/images/logo.png';
import { PiWarningFill } from 'react-icons/pi';

const Layout = () => {
  const location = useLocation();

  return (
    <div className='w-[100vw] h-[100vh] bg-grayBackground'>
      <div className='mx-auto max-w-[1440px] h-[100%] bg-white'>
        {location.pathname != '/' && (
          <div className='w-[100%] h-[64px] flex items-center pr-4 pl-6 py-1 justify-between'>
            <img src={Logo} alt='로고' className='h-14' />
            {location.pathname == '/dashboard' && (
              <div className='self-end flex gap-2 items-center min-w-[800px] justify-end'>
                <PiWarningFill size={20} className='text-yellow-400' />
                <p className='font-bold text-red my-1'>
                  본 대시보드는 파생상품 투자를 돕기 위한 어시스턴트 프로그램에
                  불과하며, 모든 투자의 결정과 책임은 본인에게 있습니다.
                </p>
              </div>
            )}
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
