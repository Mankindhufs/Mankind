import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { IndexProp, ParamsTick } from '../../../typings/types';

const IndexChartItem = ({ data }: { data: IndexProp }) => {
  // Y축 간격 일정하게 설정
  const tickFormatter = ({ min, max, interval = 4 }: ParamsTick) => {
    const range = max - min || 1; // 0 방지
    const exponent = Math.floor(Math.log10(range));
    const numberOfDigit = Math.pow(10, exponent);

    const domainMin = Math.floor(min / numberOfDigit) * numberOfDigit;
    const domainMax = Math.ceil(max / numberOfDigit) * numberOfDigit;

    const finalRange = domainMax - domainMin;
    const gradeSize = Math.max(1, Math.round(finalRange / interval)); // 최소 1 보장

    // 눈금 리스트
    const grades = [];
    for (let i = domainMin; i <= domainMax; i += gradeSize) {
      grades.push(Math.ceil(i));
    }

    return { domainMin, domainMax, grades };
  };

  // 최대, 최소값 구해서 간격 설정
  const closes = data.prices.map((item) => item.close);
  const { domainMin, domainMax, grades } = tickFormatter({
    min: Math.min(...closes),
    max: Math.max(...closes),
  });

  // X축 개수 설정
  // const tickCount = (data: string[]) => {
  //   const middleItem = Math.floor(data.length / 2);
  //   const max = middleItem + 3;
  //   const min = middleItem - 3;

  //   const days = [];

  //   for (let i = min; i < max + 1; i += 1) {
  //     days.push(i);
  //   }

  //   const start = days[0];
  //   const end = days[days.length - 1];

  //   return { start, end, days };
  // };

  // const dates = data.prices.map((item) => item.date);
  // const { start, end, days } = tickCount(dates);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data.prices}>
        <XAxis dataKey='date' fontSize={12} />
        <YAxis
          fontSize={12}
          domain={[domainMin, domainMax]}
          ticks={grades}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip />
        <Line
          key='close'
          type='monotone'
          dataKey='close'
          stroke='#3873e0'
          strokeWidth={1}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IndexChartItem;
