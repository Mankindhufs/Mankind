import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-grayBackground'>
      <div className='mx-auto max-w-[1440px] h-[100%] bg-white'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
