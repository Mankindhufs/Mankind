// src/pages/VerifyPage/index.tsx
import React, { ChangeEvent, useState } from 'react';
import SectionHeader from './components/SectionHeader';
import InfoRow from './components/InfoRow';
import EditButton from './components/EditButton';
import { PdfValue, Round, RoundKey } from '../../typings/types';
import { getFileValue, setFileValue } from '../../utils/savedFile';
import { useNavigate } from 'react-router-dom';
import { isValidNumber } from '../../utils/validationCheck';
import Alert from '../../components/Alert';
import { formattedDate } from '../../utils/format';

const VerifyPage: React.FC = () => {
  // 데이터 로딩 훅
  const data: PdfValue | null = getFileValue();

  console.log(data);
  // ‘수정 모드’ 상태 추가
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<PdfValue | null>(() => {
    if (data) {
      return {
        기초자산: data.기초자산,
        낙인구간: data.낙인구간,
        만기일: data.만기일,
        만기평가일: data.만기평가일,
        위험등급: data.위험등급,
        손실조건버전: data.손실조건버전,
        자동조기상환: {
          '1차': {
            자동조기상환평가일: data.자동조기상환['1차'].자동조기상환평가일,
            자동조기상환성립조건: data.자동조기상환['1차'].자동조기상환성립조건,
            자동조기상환수익률: data.자동조기상환['1차'].자동조기상환수익률,
          },
          '2차': {
            자동조기상환평가일: data.자동조기상환['2차'].자동조기상환평가일,
            자동조기상환성립조건: data.자동조기상환['2차'].자동조기상환성립조건,
            자동조기상환수익률: data.자동조기상환['2차'].자동조기상환수익률,
          },
          '3차': {
            자동조기상환평가일: data.자동조기상환['3차'].자동조기상환평가일,
            자동조기상환성립조건: data.자동조기상환['3차'].자동조기상환성립조건,
            자동조기상환수익률: data.자동조기상환['3차'].자동조기상환수익률,
          },
          '4차': {
            자동조기상환평가일: data.자동조기상환['4차'].자동조기상환평가일,
            자동조기상환성립조건: data.자동조기상환['4차'].자동조기상환성립조건,
            자동조기상환수익률: data.자동조기상환['4차'].자동조기상환수익률,
          },
          '5차': {
            자동조기상환평가일: data.자동조기상환['5차'].자동조기상환평가일,
            자동조기상환성립조건: data.자동조기상환['5차'].자동조기상환성립조건,
            자동조기상환수익률: data.자동조기상환['5차'].자동조기상환수익률,
          },
        },
        종목명: data.종목명,
        최대손실만기조건비율: data.최대손실만기조건비율,
      };
    } else {
      return null;
    }
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [animation, setAnimation] = useState('');

  const navigate = useNavigate();

  // 중첩객체(자동조기상환) 처리 위한 함수
  const editedNestedValue = (
    origin: PdfValue['자동조기상환'],
    path: string,
    value: string | number | Date,
  ) => {
    const match = path.match(/^자동조기상환\[(.+?)\]\.(.+)$/); //자동조기상환['1차'].자동조기상환수익률에서 []안, .뒤 문자열 추출
    if (!match) return origin;
    const roundKey = match[1] as RoundKey; // "1차"
    const itemKey = match[2] as keyof Round; // "자동조기상환수익률"

    // 새로운 객체값 생성
    const newObj = {
      ...origin,
      [roundKey]: {
        ...origin[roundKey],
        [itemKey]: value,
      },
    };

    return newObj;
  };

  // 새로운 입력값
  const handleGetEditedValue = (
    e?: ChangeEvent<HTMLInputElement>,
    name?: string,
    date?: Date | null,
  ): void => {
    if (editedData) {
      if (e) {
        const path = e.target.name;
        const value = e.target.value;

        // 자동조기상환만 별도로 처리
        if (!path.includes('자동조기상환')) {
          setEditedData({ ...editedData, [path]: value });
        } else {
          const updated = editedNestedValue(
            editedData.자동조기상환,
            path,
            value,
          );
          setEditedData({ ...editedData, 자동조기상환: updated });
        }
      } else {
        // Date값 처리
        if (name && date) {
          const string_date = formattedDate(date);

          if (!name.includes('자동조기상환')) {
            setEditedData({ ...editedData, [name]: string_date });
          } else {
            const updated = editedNestedValue(
              editedData.자동조기상환,
              name,
              string_date,
            );
            setEditedData({ ...editedData, 자동조기상환: updated });
          }
        }
      }
    }
  };

  // 경고메세지 출력
  const isValid = () => {
    let alertMessage = '';

    if (editedData) {
      // 자동조기상환 숫자 형식 확인
      const hasInvalidNumber = Object.entries(editedData.자동조기상환).some(
        ([_, value]) =>
          !isValidNumber(value.자동조기상환성립조건) ||
          !isValidNumber(value.자동조기상환수익률),
      );

      // 자동조기상환 제외한 나머지 공백 확인
      const hasEmpty = Object.entries(editedData).some(([key, value]) => {
        if (key !== '자동조기상환') {
          if (typeof value === 'string') return value.trim() === '';
        }
        return false;
      });

      // 자동조기상환 공백 확인
      const hasEmptyInNested = Object.entries(editedData.자동조기상환).some(
        ([_, value]) =>
          value.자동조기상환성립조건.toString() === '' ||
          value.자동조기상환수익률.toString() === '' ||
          value.자동조기상환평가일 === '',
      );

      if (
        !isValidNumber(editedData.최대손실만기조건비율) ||
        !isValidNumber(editedData.낙인구간) ||
        hasInvalidNumber
      ) {
        alertMessage += '숫자 형식이 아닙니다.';
      }

      if (hasEmpty || hasEmptyInNested) {
        if (alertMessage != '') {
          alertMessage += '/공백을 포함할 수 없습니다.';
        } else {
          alertMessage += '공백을 포함할 수 없습니다.';
        }
      }
    }

    return alertMessage;
  };

  // 수정 끝났을 때 실행 - 최종 데이터 localStorage에 저장
  const handleFinishEdit = () => {
    if (editedData) {
      const newData = {
        기초자산: editedData.기초자산,
        낙인구간: editedData.낙인구간,
        만기일: editedData.만기일,
        만기평가일: editedData.만기평가일,
        위험등급: editedData.위험등급,
        손실조건버전: editedData.손실조건버전,
        자동조기상환: {
          '1차': {
            자동조기상환평가일:
              editedData.자동조기상환['1차'].자동조기상환평가일,
            자동조기상환성립조건:
              editedData.자동조기상환['1차'].자동조기상환성립조건,
            자동조기상환수익률:
              editedData.자동조기상환['1차'].자동조기상환수익률,
          },
          '2차': {
            자동조기상환평가일:
              editedData.자동조기상환['2차'].자동조기상환평가일,
            자동조기상환성립조건:
              editedData.자동조기상환['2차'].자동조기상환성립조건,
            자동조기상환수익률:
              editedData.자동조기상환['2차'].자동조기상환수익률,
          },
          '3차': {
            자동조기상환평가일:
              editedData.자동조기상환['3차'].자동조기상환평가일,
            자동조기상환성립조건:
              editedData.자동조기상환['3차'].자동조기상환성립조건,
            자동조기상환수익률:
              editedData.자동조기상환['3차'].자동조기상환수익률,
          },
          '4차': {
            자동조기상환평가일:
              editedData.자동조기상환['4차'].자동조기상환평가일,
            자동조기상환성립조건:
              editedData.자동조기상환['4차'].자동조기상환성립조건,
            자동조기상환수익률:
              editedData.자동조기상환['4차'].자동조기상환수익률,
          },
          '5차': {
            자동조기상환평가일:
              editedData.자동조기상환['5차'].자동조기상환평가일,
            자동조기상환성립조건:
              editedData.자동조기상환['5차'].자동조기상환성립조건,
            자동조기상환수익률:
              editedData.자동조기상환['5차'].자동조기상환수익률,
          },
        },
        종목명: editedData.종목명,
        최대손실만기조건비율: editedData.최대손실만기조건비율,
      };
      const errors = isValid();

      // 에러메세지가 없어야 대시보드 페이지로 이동 가능
      if (errors) {
        setErrorMessage(errors);
        setShowAlert(true);
        setAnimation('animate-showAlert');
      } else {
        setFileValue(newData); // localStorage 저장
        setIsEditing(false);
        handleHideAlert();
      }
    }
  };

  // 애니메이션이 끝난 후 showAlert를 false로 변경
  const handleHideAlert = () => {
    // if (showAlert && animation == 'animate-showAlert') {
    //   setAnimation('animate-hideAlert');

    //   setTimeout(() => {
    //     setShowAlert(false);
    //   }, 900);
    // }
    if (showAlert && animation === 'animate-showAlert') {
      setAnimation('animate-hideAlert');
    }
  };

  return (
    <>
      {editedData ? (
        <div className='h-[calc(100vh-64px)] mx-auto'>
          {/* 검증 통과 못할 시 경고창 */}
          {showAlert && (
            <Alert
              animation={animation}
              alertMessage='수정을 완료할 수 없습니다.'
              errorMessage={errorMessage}
              hideAlertFunction={handleHideAlert}
              setAlert={setShowAlert}
            />
          )}
          <div className='grid grid-cols-12 grid-rows-auto gap-4 h-full px-5 pb-5'>
            {/* 1열: 기초 지수 */}
            <div className='w-[90%] min-w-80 justify-self-center flex flex-col items-center box-border p-4 row-span-2 col-span-4'>
              <SectionHeader title='기초 지수' />
              {editedData.기초자산.split('/').map((idx) => (
                <InfoRow
                  name={idx}
                  key={idx}
                  label={idx}
                  value={idx}
                  readOnly
                  hideLabel
                  plainText
                />
              ))}
            </div>

            {/* 2열: 최대손실 성립 조건 % */}
            <div className='w-[90%] justify-self-center flex flex-col items-center box-border p-4 col-span-4 row-span-2'>
              <SectionHeader title='최대손실 성립 조건 %' />
              <InfoRow
                name='최대손실만기조건비율'
                label='만기일 가격'
                value={editedData.최대손실만기조건비율}
                suffix='%'
                readOnly={!isEditing}
                inputClassName='w-32' /* 128 px */
                onChangeFunction={handleGetEditedValue}
              />
              <InfoRow
                name='낙인구간'
                label='낙인 구간'
                value={editedData.낙인구간}
                suffix='%'
                readOnly={!isEditing}
                inputClassName='w-32'
                onChangeFunction={handleGetEditedValue}
              />
            </div>

            {/* 3열: 만기평가일 및 만기일 */}
            <div className='w-[90%] justify-self-center flex flex-col items-center box-border p-4 col-span-4 row-span-2'>
              <SectionHeader title='만기평가일 및 만기일' />
              <InfoRow
                name='만기평가일'
                label='만기평가일'
                value={editedData.만기평가일}
                readOnly={!isEditing}
                onChangeFunction={handleGetEditedValue}
                datetype={true}
              />{' '}
              {/* 192 px */}
              <InfoRow
                name='만기일'
                label='만기일'
                value={editedData.만기일}
                readOnly
                plainText
              />
            </div>

            {/* 4열: 자동조기상환평가일 (2행 1열) */}
            <div className='w-[90%] justify-self-center flex flex-col items-center box-border p-4 col-span-4  row-start-3 row-span-2'>
              <SectionHeader title='자동조기상환평가일' />
              {Object.entries(editedData.자동조기상환).map(([i, data]) => (
                <InfoRow
                  name={`자동조기상환[${i}].자동조기상환평가일`}
                  key={i}
                  label={i}
                  value={data.자동조기상환평가일}
                  readOnly={!isEditing}
                  onChangeFunction={handleGetEditedValue}
                  datetype={true}
                />
              ))}
            </div>

            {/* 5열: 자동조기상환 성립 조건 (% 이상) */}
            <div className='w-[90%] justify-self-center flex flex-col items-center box-border p-4 col-span-4 row-start-3 row-span-2'>
              <SectionHeader title='자동조기상환 성립 조건 (% 이상)' />
              {Object.entries(editedData.자동조기상환).map(([i, data]) => (
                <InfoRow
                  name={`자동조기상환[${i}].자동조기상환성립조건`}
                  key={i}
                  label={i}
                  value={data.자동조기상환성립조건}
                  suffix='%'
                  readOnly={!isEditing}
                  inputClassName='w-32'
                  onChangeFunction={handleGetEditedValue}
                />
              ))}
            </div>

            {/* 6열: 자동조기상환 수익률 */}
            <div className='w-[90%] justify-self-center flex flex-col items-center box-border p-4 col-span-4 row-start-3 row-span-2'>
              <SectionHeader title='자동조기상환 수익률' />
              {Object.entries(editedData.자동조기상환).map(([i, data]) => (
                <InfoRow
                  name={`자동조기상환[${i}].자동조기상환수익률`}
                  key={i}
                  label={i}
                  value={data.자동조기상환수익률}
                  suffix='%'
                  readOnly={!isEditing}
                  inputClassName='w-28'
                  prefix='액면금액 x'
                  onChangeFunction={handleGetEditedValue}
                />
              ))}
            </div>

            {/* 수정/확인 버튼 */}
            <div className='flex gap-4 items-center justify-center col-span-full'>
              {isEditing == false ? (
                <EditButton
                  value='수정'
                  backgroundColor='bg-white'
                  textColor='text-black'
                  onClickFunction={() => setIsEditing(!isEditing)}
                />
              ) : (
                <EditButton
                  value='수정 완료'
                  backgroundColor='bg-mainGreen'
                  onClickFunction={handleFinishEdit}
                  textColor='text-white'
                />
              )}

              <button
                className={`w-48 h-14 rounded-[50px] border-[1px] border-solid ${isEditing ? 'bg-grayBorder' : 'bg-mainGreen'}`}
                onClick={() => navigate('/dashboard')}
                disabled={isEditing ? true : false}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full text-center'>
          <p className='mb-5'>데이터를 불러올 수 없습니다.</p>
          <button
            className='text-sm h-12 bg-mainGreen rounded-md w-[20%] min-w-52 max-w-72 p-2 text-white hover:bg-green-600'
            onClick={() => navigate('/')}
          >
            파일 재업로드하기
          </button>
        </div>
      )}
    </>
  );
};

export default VerifyPage;
