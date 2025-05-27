import { IoSearch } from 'react-icons/io5';
import { useGetWord } from '../hooks/useGetWord';
import { ChangeEvent, useState } from 'react';

const SearchWord = () => {
  const [word, setWord] = useState<string>('');

  const { data, isPending, isError } = useGetWord(word);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    let searchedWord = e.currentTarget.value;

    if (!searchedWord) {
      console.log('검색어를 다시 입력해주세요.');
    }

    setWord(searchedWord);
  };

  console.log(data);

  return (
    <form
      method='get'
      className='flex gap-1 bg-white p-3 w-full rounded-[10px] text-sm justify-between shadow-md'
    >
      <input
        type='search'
        placeholder='금융 단어를 검색해보세요.'
        className='flex-[10] outline-none w-full'
        value={word}
        onChange={handleSearch}
      />
      <button type='submit' className='flex-[1]'>
        <IoSearch size={20} />
      </button>
    </form>
  );
};

export default SearchWord;
