// Date 타입 '0000-00-00' string 타입으로 변환
export const formattedDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const day = value.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  return dateString;
};
