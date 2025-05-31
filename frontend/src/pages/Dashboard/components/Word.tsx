import { HiMiniXMark } from 'react-icons/hi2';
import { RiExpandDiagonalS2Line } from 'react-icons/ri';
import { useGetWord } from '../hooks/useGetWord';
import { useState } from 'react';
import WordModal from './WordModal';

const Word = ({
  word,
  onButtonClick,
}: {
  word: string;
  onButtonClick: () => void;
}) => {
  const { result, isPending } = useGetWord(word);
  const [showWordModal, setShowWordModal] = useState<boolean>(false);

  const handleClickShowModal = () => {
    setShowWordModal(true);
  };

  return (
    <>
      <div className='bg-white p-4 w-full max-h-60 rounded-[10px] shadow-md relative flex flex-col'>
        {isPending ? (
          <div className='w-full text-center text-gray-400 text-sm'>
            검색중...
          </div>
        ) : !result ? (
          <>
            <div className='flex flex-col items-center gap-4'>
              <p className='text-sm'>검색 결과를 찾을 수 없습니다.</p>
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${word}`,
                    '_blank',
                  )
                }
                className='bg-grayBackground text-sm hover:bg-mainGreen rounded-md w-[60%] p-2 hover:text-white'
              >
                구글 검색하기
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='flex gap-1 justify-end'>
              <button>
                <RiExpandDiagonalS2Line
                  size={18}
                  className='hover:text-blue-600 hover:scale-110 duration-100 ease-linear transition'
                  onClick={handleClickShowModal}
                />
              </button>
              <button onClick={onButtonClick}>
                <HiMiniXMark
                  size={20}
                  className='hover:text-red hover:scale-110 duration-100 ease-linear transition'
                />
              </button>
            </div>

            <header className='font-semibold flex flex-col gap-1 bg-white mb-1 break-keep'>
              {result.term}
              <hr className='w-full h-[2px] bg-mainGreen border-none' />
            </header>

            <p className='text-sm h-full overflow-scroll box-border py-2'>
              {result.definition}
            </p>
            {showWordModal && result && (
              <WordModal onClickButton={setShowWordModal} props={result} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Word;
