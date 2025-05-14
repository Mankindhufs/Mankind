
// src/pages/VerifyPage/index.tsx
import React, {useState} from 'react';
import SectionHeader from './components/SectionHeader';
import InfoRow from './components/InfoRow';
import useVerifyData from './hooks/useVerifyData';
import EditConfirmButtons from './components/EditConfirmButtons';


const VerifyPage: React.FC = () => {
  // 데이터 로딩 훅
  const { data, isLoading, isError } = useVerifyData();
  // ‘수정 모드’ 상태 추가
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = () => {
    // TODO: 실제 저장 로직 수행
    setIsEditing(false);
  };

  if (isLoading) return <div className="p-8">로딩 중…</div>;
  if (isError || !data) return <div className="p-8">데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="relative p-8 max-w-[1200px] mx-auto">
    <div className="grid grid-cols-[repeat(3,minmax(240px,1fr))]  gap-6">
      
      {/* 1열: 기초 지수 */}
      <div>
        <SectionHeader title="기초 지수" />
        {data.indices.map(idx => (
          <InfoRow key={idx} label={idx} value={idx} readOnly hideLabel
          plainText
          />
        ))}
      </div>

      {/* 2열: 최대손실 성립 조건 % */}
      <div>
        <SectionHeader title="최대손실 성립 조건 %" />
        <InfoRow 
          label="만기일 가격"
          value={data.maxLossPrice.toString()} 
          suffix="%" 
          readOnly={!isEditing}
          inputClassName='w-32' /* 128 px */
        />
        <InfoRow label="낙인 구간"   value={data.knockInRatio.toString()}   suffix="%" readOnly={!isEditing}
        inputClassName='w-32' />
      </div>

      {/* 3열: 만기평가일 및 만기일 */}
      <div>
        <SectionHeader title="만기평가일 및 만기일" />
        <InfoRow label="만기평가일" value={data.evaluationDate} readOnly={!isEditing}
        inputClassName='w-48' /> {/* 192 px */}
        <InfoRow label="만기일"     value={data.maturityDate}  readOnly
        inputClassName='w-48' plainText />
      </div>

      {/* 4열: 자동조기상환평가일 (2행 1열) */}
      <div>
        <SectionHeader title="자동조기상환평가일" />
        {data.earlyRedeemDates.map((date, i) => (
          <InfoRow key={i} label={`${i + 1}차`} value={date} readOnly={!isEditing}
          inputClassName='w-48'
          />
        ))}
      </div>

      {/* 5열: 자동조기상환 성립 조건 (% 이상) */}
      <div>
        <SectionHeader title="자동조기상환 성립 조건 (% 이상)" />
        {data.earlyRedeemConditions.map((c, i) => (
          <InfoRow key={i} label={`${i + 1}차`} value={c.toString()} suffix="%" readOnly={!isEditing}
          inputClassName='w-32' />
        ))}
      </div>

      {/* 6열: 자동조기상환 수익률 */}
      <div>
        <SectionHeader title="자동조기상환 수익률" />
        {data.earlyRedeemYields.map((y, i) => (
          <InfoRow key={i} label={`${i + 1}차`} value={y.toString()} suffix="%" readOnly={!isEditing}
          inputClassName='w-28' prefix="액면금액 x"/>
        ))}
      </div>
      {/* 수정/확인 버튼 */}
      <EditConfirmButtons
        className="absolute top-[17rem] right-8"
        onEdit={handleEdit}
        onConfirm={handleConfirm}
        confirmDisabled={!isEditing}  // 수정 모드가 아닐 땐 확인 비활성화
      />

    </div>
    </div>
  );
};

export default VerifyPage;
