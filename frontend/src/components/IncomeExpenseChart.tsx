import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

interface IncomeExpenseChartProps {
  income: number;
  expenses: number;
}

function IncomeExpenseChart({
  income,
  expenses
}: IncomeExpenseChartProps) {

  const data = [
    {
      name: "Income",
      amount: income
    },
    {
      name: "Expenses",
      amount: expenses
    }
  ];

  return (
    <div>
      <h2>Income vs Expenses</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;