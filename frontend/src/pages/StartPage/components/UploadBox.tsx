import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import ConfirmButton from './ConfirmButton';
import { useRef, useState } from 'react';
import FileInfo from './FileInfo';
import usePostFile from '../hooks/usePostFile';
import Spinner from '../../../components/Spinner';

export interface FileInfoProps {
  name: string;
  file: File | null;
}

const UploadBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState<FileInfoProps | null>(null);
  let inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending, isError, reset } = usePostFile();

  const handleDragEnter = () => {
    setIsActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget as Node | null;

    // 관련 타겟이 없거나 (예: 브라우저 밖으로 나가는 경우)
    // 관련 타겟이 현재 영역 밖이면 setIsActive(false)
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      setIsActive(false);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // 파일 형식이 pdf인지 확인 후 저장하는 함수
  const validFile = (file: File) => {
    // 뮤테이션의 내부 상태 초기화
    reset();
    const { name } = file;
    const fileType = file.type;

    if (!fileType.includes('pdf')) {
      alert('pdf 형식의 파일만 업로드 가능합니다.');
      return;
    }

    setUploadedInfo({ name, file });
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      validFile(file);
    }
  };

  // 클릭해서 업로드
  const handleUpload = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (file) {
      validFile(file);
      target.value = '';
    }
  };

  // 선택한 파일 취소
  const handleDeleteFile = () => {
    if (inputRef.current) {
      setUploadedInfo(null);
      // 뮤테이션의 내부 상태 초기화
      reset();
      inputRef.current.value = '';
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 w-[100%] h-[45%] min-h-72 max-h-[400px]'>
      <label
        htmlFor='file'
        className={`w-[100%] h-[100%] border-2 border-dashed box-border p-7 min-w-[420px] rounded-[20px] flex flex-col justify-center items-center gap-8 overflow-auto text-grayIcon cursor-pointer ${uploadedInfo || isActive ? 'border-gray-800 bg-[#F2FDF0]' : 'bg-grayBackground border-grayBorder'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type='file'
          className='hidden'
          onChange={handleUpload}
          id='file'
          accept='.pdf'
          ref={inputRef}
        />
        {/* 파일 업로드 중이거나 업로드 실패했을 때 처리 */}
        {!uploadedInfo && (
          <>
            <HiOutlineDocumentArrowUp size={120} className='stroke-[1.5]' />
            <p className='text-center'>
              클릭해서 파일을 선택하거나 드래그해주세요.
            </p>
          </>
        )}
        {isPending ? (
          <Spinner />
        ) : isError ? (
          <div>업로드 실패</div>
        ) : uploadedInfo ? (
          <FileInfo uploadedInfo={uploadedInfo} />
        ) : null}
      </label>
      {uploadedInfo && (
        <div className='flex min-w-[420px] gap-4 items-center justify-center'>
          <button
            className='w-48 h-14 rounded-[50px] border-[1px] border-solid border-black'
            onClick={handleDeleteFile}
          >
            삭제
          </button>
          <ConfirmButton data={uploadedInfo} uploadFile={uploadFile} />
        </div>
      )}
    </div>
  );
};

export default UploadBox;
