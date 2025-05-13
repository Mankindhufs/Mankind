import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

const IndexChartItem = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Line
          key='value'
          type='monotone'
          dataKey='value'
          stroke='#88e038'
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IndexChartItem;
