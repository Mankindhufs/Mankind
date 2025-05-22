// 입력값이 숫자인지 확인
export const isValidNumber = (value: number) => {
  const str_value = value.toString();
  const checkNumber = /^\d+(\.\d+)?$/;
  return checkNumber.test(str_value);
};

// // 입력값이 날짜인지 확인
// export const isValidDate = (value: string) => {
//   const checkDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
//   return checkDate.test(value);
// };
