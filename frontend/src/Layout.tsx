import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='w-[100%] h-[100vh]'>
      <div className='my-0 mx-auto max-w-[1200px] h-[100%] bg-grayBackground'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
