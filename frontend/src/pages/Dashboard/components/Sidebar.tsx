import { IoDocumentTextOutline } from 'react-icons/io5';
import SearchWord from './SearchWord';
import DueDate from './DueDate';

const SidebarContent = {
  file: 'ELS-20250317-010.pdf',
  title: '신한투자증권 26349호 파생결합증권(주가연계증권)',
  risk: '5',
};

const Sidebar = () => {
  return (
    <div
      className='flex flex-col items-center justify-center p-2
     box-border gap-3'
    >
      {/* 파일 이름 */}
      <div className='text-lg break-keep flex-[1] font-semibold'>
        {SidebarContent.title}
      </div>

      {/* 위험 등급, 약관 전문 보기 */}
      <div className='flex gap-1 w-full flex[1]'>
        <div className='bg-red text-white flex flex-col box-border p-2 rounded-[10px] flex-[2] justify-between gap-3'>
          <p className='text-start'>위험 등급</p>
          <p className='text-end text-lg'>{SidebarContent.risk}</p>
        </div>

        <a
          href={SidebarContent.file}
          target='_blank'
          className='bg-mainGreen text-white flex flex-col box-border p-2 gap-3 justify-between rounded-[10px] flex-[1] cursor-pointer'
        >
          <IoDocumentTextOutline size={30} />
          <p className='text-end break-keep'>약관 전문 확인하기</p>
        </a>
      </div>

      {/* 금융 단어 검색 */}
      <SearchWord />

      {/* 만기평가일 및 만기일 */}
      <DueDate />
    </div>
  );
};

export default Sidebar;
