import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';

const UploadBox = () => {
  return (
    <label
      htmlFor=''
      className='w-[520px] h-[590px] bg-grayBackground border-2 border-dashed border-grayBorder min-w-[320px] rounded-[20px] flex flex-col justify-center items-center gap-[40px] text-grayIcon text-[20px] cursor-pointer'
    >
      <HiOutlineDocumentArrowUp size={120} className='stroke-[1.5]' />
      Choose a file or drag it here!
      <input type='file' className='hidden' accept='.pdf' />
    </label>
  );
};

export default UploadBox;
