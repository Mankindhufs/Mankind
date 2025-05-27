import { IoDocumentTextOutline } from 'react-icons/io5';
import SearchWord from './SearchWord';
import DueDate from './DueDate';
import { SidebarProps } from '../../../typings/types';

const Sidebar = ({ props }: { props: SidebarProps }) => {
  const { 종목명, 위험등급, 만기평가일, 만기일 } = props;

  return (
    <div
      className='flex flex-col items-center justify-center p-2
     box-border gap-3'
    >
      {/* 파일 이름 */}
      <div className='text-lg break-keep flex-[1] font-semibold'>{종목명}</div>

      {/* 위험 등급, 약관 전문 보기 */}
      <div className='flex gap-1 w-full flex[1]'>
        <div className='bg-red text-white flex flex-col box-border p-2 rounded-[10px] flex-[2] justify-between gap-3'>
          <p className='text-start'>위험 등급</p>
          <p className='text-end break-keep'>{위험등급}</p>
        </div>

        <a
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
      <DueDate maturityDate={만기평가일} expirationDate={만기일} />
    </div>
  );
};

export default Sidebar;
