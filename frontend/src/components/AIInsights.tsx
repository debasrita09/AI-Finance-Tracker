interface AIInsightsProps {
  largestExpense?: [
    string,
    number
  ];

  largestExpensePercentage:
    string;

  balance: number;
  currentMonthExpenses: number;
  previousMonthExpenses: number;
  expenseChangePercentage: string;
}

function AIInsights({
  largestExpense,
  largestExpensePercentage,
  balance,
  currentMonthExpenses,
  previousMonthExpenses,
  expenseChangePercentage
}: AIInsightsProps) {

  if (!largestExpense) {
    return null;
  }

  return (
  <div>

    <h2>AI Insights</h2>

    <p>
      Your highest spending
      category is
      <strong>
        {" "}
        {largestExpense[0]}
      </strong>.
    </p>

    <p>
      You spent
      ₹{largestExpense[1]} on this category.
    </p>

    <p>
      This accounts for
      {" "}
      {largestExpensePercentage}%
      of your total expenses.
    </p>

    {
      balance > 0
        ? (
            <p>
              Your finances
              are currently
              in a positive
              state.
            </p>
          )
        : (
            <p>
              Your expenses
              exceed your
              income.
            </p>
          )
    }

    <p>
  Current Month Expenses:
  ₹{currentMonthExpenses}
    </p>

    <p>
  Previous Month Expenses:
  ₹{previousMonthExpenses}
    </p>

    {
  previousMonthExpenses > 0 && (
    <p>
      {
        currentMonthExpenses >
        previousMonthExpenses
          ? `Your spending increased by ${expenseChangePercentage}% compared to last month.`
          : `Your spending decreased by ${Math.abs(Number(expenseChangePercentage))}% compared to last month.`
      }
    </p>
      )
    }

  </div>
  );
}

export default AIInsights;