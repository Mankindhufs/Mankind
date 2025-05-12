import { IoSearch } from 'react-icons/io5';

const SearchWord = () => {
  return (
    <form
      method='get'
      className='flex gap-1 bg-white p-3 w-full rounded-[10px] text-sm justify-between shadow-md'
    >
      <input
        type='search'
        placeholder='금융 단어를 검색해보세요.'
        className='flex-[10] outline-none w-full'
      />
      <button type='submit' className='flex-[1]'>
        <IoSearch size={20} />
      </button>
    </form>
  );
};

export default SearchWord;
