import { Dispatch, SetStateAction } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { WordModalProps } from '../../../typings/types';

const WordModal = ({
  onClickButton,
  props,
}: {
  onClickButton: Dispatch<SetStateAction<boolean>>;
  props: WordModalProps;
}) => {
  return (
    <div className='fixed bg-modalBackground w-full h-full top-0 left-0 z-[1500] flex items-center justify-center'>
      <div className='max-w-[65%] bg-white rounded-2xl box-border p-10 flex flex-col justify-start relative'>
        <button className='self-end' onClick={() => onClickButton(false)}>
          <HiMiniXMark
            size={28}
            className='absolute top-3 right-3 hover:text-red hover:scale-110 duration-100 ease-linear transition'
          />
        </button>

        <main className='h-full flex flex-col gap-4'>
          <header className='w-full text-center text-3xl font-bold py-3 break-keep'>
            {props.term}
          </header>
          <hr className='h-2 border-dashed border-grayBorder' />
          <p className='py-4 leading-7 text-center'>{props.definition}</p>
        </main>
      </div>
    </div>
  );
};

export default WordModal;
