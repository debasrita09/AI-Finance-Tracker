import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

interface MonthlyExpenseTrendProps {
  data: {
    month: string;
    amount: number;
  }[];
}

function MonthlyExpenseTrend({
  data
}: MonthlyExpenseTrendProps) {

  return (
    <div>
      <h2>
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyExpenseTrend;