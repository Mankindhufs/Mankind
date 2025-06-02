import { IoSearch } from 'react-icons/io5';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import Alert from '../../../components/Alert';
const SearchWord = ({
  onSetWord,
  onSetModal,
}: {
  onSetWord: Dispatch<SetStateAction<string>>;
  onSetModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [inputWord, setInputWord] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [animation, setAnimation] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let searchedWord = e.target.value;

    setInputWord(searchedWord);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validWord = inputWord.replace(/(\s*)/g, '');
    console.log(validWord);

    if (!validWord) {
      setErrorMessage('공백만으로 이루어진 단어는 입력할 수 없습니다.');
      setShowAlert(true);
      setAnimation('animate-showAlert');
      return;
    }

    onSetWord(validWord);
    onSetModal(true);
    handleHideAlert();
  };

  const handleHideAlert = () => {
    if (showAlert && animation === 'animate-showAlert') {
      setAnimation('animate-hideAlert');
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          animation={animation}
          alertMessage='검색어가 존재하지 않습니다.'
          errorMessage={errorMessage}
          hideAlertFunction={handleHideAlert}
          setAlert={setShowAlert}
        />
      )}
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
