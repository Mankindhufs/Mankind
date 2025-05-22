// Date 타입 '0000-00-00' string 타입으로 변환
export const formattedDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const day = value.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  return dateString;
};

// 0000-00-00을 0000년 00월 00일 형식으로 변경
export const convertDateString = (value: string) => {
  const [year, month, date] = value.split('-');
  const dateString = `${year}년 ${month}월 ${date}일`;

  return dateString;
};
