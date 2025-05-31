import { IoSearch } from 'react-icons/io5';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
const SearchWord = ({
  onSetWord,
  onSetModal,
}: {
  onSetWord: Dispatch<SetStateAction<string>>;
  onSetModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputWord, setInputWord] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let searchedWord = e.target.value;

    setInputWord(searchedWord);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validWord = inputWord.replace(/(\s*)/g, '');
    console.log(validWord);

    if (!validWord) {
      console.log('검색어를 다시 입력해주세요.');
      return;
    }

    onSetWord(validWord);
    onSetModal(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex gap-1 bg-white p-3 w-full rounded-[10px] text-sm justify-between shadow-md'
      >
        <input
          type='search'
          placeholder='금융 단어를 검색해보세요.'
          className='flex-[10] outline-none w-full'
          value={inputWord}
          onChange={handleSearch}
        />
        <button type='submit' className='flex-[1]'>
          <IoSearch size={20} />
        </button>
      </form>
    </>
  );
};

export default SearchWord;
