import { PdfValue } from '../typings/types';

// 추출값 localStorage에 저장
export const setFileValue = (fileValue: PdfValue) => {
  localStorage.setItem('savedFile', JSON.stringify(fileValue));
};

// 저장된 값 호출
export const getFileValue = () => {
  try {
    const savedData = localStorage.getItem('savedFile');

    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (err) {
    console.log('Parsing Error: ', err);
    return null;
  }
};

// 저장된 값 삭제
export const removeFileValue = () => {
  localStorage.removeItem('savedFile');
};
