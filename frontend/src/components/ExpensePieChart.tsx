import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

interface ExpensePieChartProps {
  data: {
    category: string;
    amount: number;
  }[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#EC7063"
];

function ExpensePieChart({
  data
}: ExpensePieChartProps) {

  return (
    <div>
      <h2>Expense Breakdown</h2>

      <PieChart
        width={500}
        height={300}
      >
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          outerRadius={100}
          label
        >
          {
            data.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />
              )
            )
          }
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpensePieChart;