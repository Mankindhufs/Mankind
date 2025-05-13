import { ReactNode } from 'react';

const DashboardItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className='w-full h-full rounded-[10px] shadow-md box-border'>
      <div className='flex flex-col'>
        <header className='flex gap-3 h-12 items-center p-3 border-b-2 border-grayBackground bg-white'>
          <hr className='h-6 w-1 bg-mainGreen' />
          <span className='font-semibold'>{title}</span>
        </header>

        <main className='p-3'>{children}</main>
      </div>
    </section>
  );
};

export default DashboardItem;
