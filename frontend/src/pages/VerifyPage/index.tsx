// src/pages/VerifyPage/index.tsx
import React, { ChangeEvent, useState } from 'react';
import SectionHeader from './components/SectionHeader';
import InfoRow from './components/InfoRow';
import EditButton from './components/EditButton';
import { PdfValue, roundKey } from '../../typings/types';
import { getFileValue, setFileValue } from '../../utils/savedFile';
import { useNavigate } from 'react-router-dom';

export const dummy = {
  기초자산: 'KOSPI200 S&P500 EuroStoxx50',
  낙인구간: 50,
  만기일: '만기평가일(불포함) 이후 3영업일',
  만기평가일: '2027년 02월 12일',
  위험등급: 5,
  손실조건버전: 'ver2',
  자동조기상환: {
    first: {
      자동조기상환평가일: '2025-09-25',
      자동조기상환성립조건: 90,
      자동조기상환수익률: 104.65,
    },
    second: {
      자동조기상환평가일: '2026-03-25',
      자동조기상환성립조건: 90,
      자동조기상환수익률: 104.65,
    },
    third: {
      자동조기상환평가일: '2026-09-23',
      자동조기상환성립조건: 85,
      자동조기상환수익률: 113.95,
    },
    fourth: {
      자동조기상환평가일: '2027-03-25',
      자동조기상환성립조건: 85,
      자동조기상환수익률: 118.6,
    },
    fifth: {
      자동조기상환평가일: '2027-09-24',
      자동조기상환성립조건: 80,
      자동조기상환수익률: 123.25,
    },
  },
  종목명: '신한투자증권 25427호 파생결합증권(주가연계증권)',
  최대손실만기조건비율: 75,
};
setFileValue(dummy);

const VerifyPage: React.FC = () => {
  const savedData: PdfValue = getFileValue();
  console.log('savedData: ', savedData);
  // 데이터 로딩 훅
  // const { data, isPending, isError } = usePostFile();
  // ‘수정 모드’ 상태 추가
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<PdfValue>({
    기초자산: savedData.기초자산,
    낙인구간: savedData.낙인구간,
    만기일: savedData.만기일,
    만기평가일: savedData.만기평가일,
    위험등급: savedData.위험등급,
    손실조건버전: savedData.손실조건버전,
    자동조기상환: {
      first: {
        자동조기상환평가일: savedData.자동조기상환.first.자동조기상환평가일,
        자동조기상환성립조건: savedData.자동조기상환.first.자동조기상환성립조건,
        자동조기상환수익률: savedData.자동조기상환.first.자동조기상환수익률,
      },
      second: {
        자동조기상환평가일: savedData.자동조기상환.second.자동조기상환평가일,
        자동조기상환성립조건:
          savedData.자동조기상환.second.자동조기상환성립조건,
        자동조기상환수익률: savedData.자동조기상환.second.자동조기상환수익률,
      },
      third: {
        자동조기상환평가일: savedData.자동조기상환.third.자동조기상환평가일,
        자동조기상환성립조건: savedData.자동조기상환.third.자동조기상환성립조건,
        자동조기상환수익률: savedData.자동조기상환.third.자동조기상환수익률,
      },
      fourth: {
        자동조기상환평가일: savedData.자동조기상환.fourth.자동조기상환평가일,
        자동조기상환성립조건:
          savedData.자동조기상환.fourth.자동조기상환성립조건,
        자동조기상환수익률: savedData.자동조기상환.fourth.자동조기상환수익률,
      },
      fifth: {
        자동조기상환평가일: savedData.자동조기상환.fifth.자동조기상환평가일,
        자동조기상환성립조건: savedData.자동조기상환.fifth.자동조기상환성립조건,
        자동조기상환수익률: savedData.자동조기상환.fifth.자동조기상환수익률,
      },
    },
    종목명: savedData.종목명,
    최대손실만기조건비율: savedData.최대손실만기조건비율,
  });

  const round: { [key: string]: string } = {
    first: '1차',
    second: '2차',
    third: '3차',
    fourth: '4차',
    fifth: '5차',
  };

  const navigate = useNavigate();

  // 중첩객체(자동조기상환) 처리 위한 함수
  const editedNestedValue = (
    origin: PdfValue['자동조기상환'],
    path: string,
    value: string | number,
  ) => {
    const splitedPath = path.split('.');
    const roundKey = splitedPath[1] as roundKey;
    const itemKey = splitedPath[2];

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
  const handleGetEditedValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const path = e.target.name;
    const value = e.target.value;

    // 자동조기상환만 별도로 처리
    if (!path.includes('자동조기상환')) {
      setEditedData({ ...editedData, [path]: value });
    } else {
      const updated = editedNestedValue(editedData.자동조기상환, path, value);
      setEditedData({ ...editedData, 자동조기상환: updated });
    }
  };

  const handleFinishEdit = () => {
    // TODO: 실제 저장 로직 수행
    const newData = {
      기초자산: savedData.기초자산,
      낙인구간: editedData.낙인구간,
      만기일: editedData.만기일,
      만기평가일: editedData.만기평가일,
      위험등급: savedData.위험등급,
      손실조건버전: savedData.손실조건버전,
      자동조기상환: {
        first: {
          자동조기상환평가일: editedData.자동조기상환.first.자동조기상환평가일,
          자동조기상환성립조건:
            editedData.자동조기상환.first.자동조기상환성립조건,
          자동조기상환수익률: editedData.자동조기상환.first.자동조기상환수익률,
        },
        second: {
          자동조기상환평가일: editedData.자동조기상환.second.자동조기상환평가일,
          자동조기상환성립조건:
            editedData.자동조기상환.second.자동조기상환성립조건,
          자동조기상환수익률: editedData.자동조기상환.second.자동조기상환수익률,
        },
        third: {
          자동조기상환평가일: editedData.자동조기상환.third.자동조기상환평가일,
          자동조기상환성립조건:
            editedData.자동조기상환.third.자동조기상환성립조건,
          자동조기상환수익률: editedData.자동조기상환.third.자동조기상환수익률,
        },
        fourth: {
          자동조기상환평가일: editedData.자동조기상환.fourth.자동조기상환평가일,
          자동조기상환성립조건:
            editedData.자동조기상환.fourth.자동조기상환성립조건,
          자동조기상환수익률: editedData.자동조기상환.fourth.자동조기상환수익률,
        },
        fifth: {
          자동조기상환평가일: editedData.자동조기상환.fifth.자동조기상환평가일,
          자동조기상환성립조건:
            editedData.자동조기상환.fifth.자동조기상환성립조건,
          자동조기상환수익률: editedData.자동조기상환.fifth.자동조기상환수익률,
        },
      },
      종목명: savedData.종목명,
      최대손실만기조건비율: editedData.최대손실만기조건비율,
    };

    if (
      newData.낙인구간 &&
      newData.만기평가일 &&
      newData.최대손실만기조건비율 &&
      Object.entries(newData.자동조기상환).every((item) =>
        Object.entries(item).every(
          (value) => value !== null && value !== undefined,
        ),
      )
    ) {
      setFileValue(newData);
    }

    setIsEditing(false);
  };

  // if (isPending) return <div className='p-8'>로딩 중…</div>;
  // if (isError || !data)
  //   return <div className='p-8'>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className='h-[calc(100vh-64px)] mx-auto'>
      <div className='grid grid-cols-12 grid-rows-auto gap-4 h-full px-5 pb-5'>
        {/* 1열: 기초 지수 */}
        <div className='w-[90%] min-w-80 justify-self-center flex flex-col items-center box-border p-4 row-span-2 col-span-4'>
          <SectionHeader title='기초 지수' />
          {editedData.기초자산.split(' ').map((idx) => (
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
              name={`자동조기상환.${i}.자동조기상환평가일`}
              key={i}
              label={round[i]}
              value={data.자동조기상환평가일}
              readOnly={!isEditing}
              onChangeFunction={handleGetEditedValue}
            />
          ))}
        </div>

        {/* 5열: 자동조기상환 성립 조건 (% 이상) */}
        <div className='w-[90%] justify-self-center flex flex-col items-center box-border p-4 col-span-4 row-start-3 row-span-2'>
          <SectionHeader title='자동조기상환 성립 조건 (% 이상)' />
          {Object.entries(editedData.자동조기상환).map(([i, data]) => (
            <InfoRow
              name={`자동조기상환.${i}.자동조기상환성립조건`}
              key={i}
              label={round[i]}
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
              name={`자동조기상환.${i}.자동조기상환수익률`}
              key={i}
              label={round[i]}
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
  );
};

export default VerifyPage;
