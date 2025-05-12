import { Outlet, useLocation } from 'react-router-dom';
import Logo from './assets/images/logo.svg?react';
import { PiWarningFill } from 'react-icons/pi';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`w-screen h-screen ${path == '/verify' ? 'bg-grayBackground' : 'bg-white'}`}
    >
      <div className={`mx-auto max-w-[1440px] `}>
        {path != '/' && (
          <header
            className={`fixed left-0 right-0 top-0 z-50 w-full h-[64px] bg-white ${path == '/verify' ? 'shadow-sm' : ''}`}
          >
            <div className='flex mx-auto max-w-[1440px] items-center pr-4 pl-1 py-1 justify-between'>
              <Logo className='h-14 w-36 min-w-[144px]' />
              {path == '/dashboard' && (
                <div className='self-end flex items-center min-w-[800px] justify-end bg-white'>
                  <PiWarningFill size={20} className='text-yellow-400' />
                  <p className='font-bold text-red my-1'>
                    본 대시보드는 파생상품 투자를 돕기 위한 어시스턴트
                    프로그램에 불과하며, 모든 투자의 결정과 책임은 본인에게
                    있습니다.
                  </p>
                </div>
              )}
            </div>
          </header>
        )}
        <div className={`${path == '/' ? '' : 'pt-[64px]'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

