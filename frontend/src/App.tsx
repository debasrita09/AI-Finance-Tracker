import { useEffect, useState } from "react";
import { getTransactions, addTransaction, deleteTransaction, updateTransaction, getAIInsights } from "./services/transactionApi";
import { type Transaction } from "./types/transaction";
import TransactionCard from "./components/TransactionCard";
import TransactionForm from "./components/TransactionForm";
import DashboardSummary from "./components/DashboardSummary";
import ExpensePieChart from "./components/ExpensePieChart";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import MonthlyExpenseTrend from "./components/MonthlyExpenseTrend";
import AIInsights from "./components/AIInsights";
import { useAuth } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/clerk-react";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [aiInsights, setAIInsights] = useState("");
  const [aiLoading, setAILoading] = useState(false);
  const { user, isLoaded } = useUser();
  const {getToken} = useAuth()
  

  console.log(user?.id);

  async function fetchTransactions() {
    if (!user?.id) return;
    try {

      setLoading(true);

      const token = await getToken();

      if (!token) return;
      console.log("User:", user?.id);
      console.log("Token:", token);
      const data = await getTransactions(token);

      setTransactions(data);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load transactions"
      );
    } finally {

      setLoading(false);

    }
  }
  useEffect(() => {

    if (user?.id) {
      fetchTransactions();
    }

  }, [user]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    console.log("SUBMIT CLICKED");
    e.preventDefault();

    try {

      const token = await getToken();

      if (!token) return;

      await addTransaction({
        amount: Number(amount),
        category,
        type,
        description,
        
      }, token);

      await fetchTransactions();

      setAmount("");
      setCategory("");
      setType("expense");
      setDescription("");

      alert("Transaction added!");

    } catch (error) {

      console.error(error);

      alert("Failed to add transaction");
    }
  }

  async function handleDelete(id: number) {
    try {
      const token = await getToken();

      if (!token) return;

      await deleteTransaction(id, token);

      await fetchTransactions();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete transaction"
      );
    }
  }

  async function handleEdit(transaction: Transaction) {

    const newAmount =
      prompt(
        "Enter new amount:",
        transaction.amount.toString()
      );

    if (!newAmount) return;

    try {

      const token = await getToken();

      if (!token) return;

      await updateTransaction(
        transaction.id,
        {
          amount:
            Number(newAmount)
        },
        token
      );

      await fetchTransactions();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update transaction"
      );
    }
  }

  async function generateAIInsights() {

    try {

      setAILoading(true);

      const token = await getToken();

      if (!token) return;

      const insights =
        await getAIInsights(
          transactions,
          token
        );

      setAIInsights(
        insights
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to generate AI insights"
      );

    } finally {

      setAILoading(false);

    }
  }


  if (!isLoaded) {
    return <p>Loading authentication...</p>;
  }

  if (user && loading) {
    return (
      <div>
        <h1>Personal Finance Tracker</h1>
        <p>Loading transactions...</p>
      </div>
    );
  }

  const totalIncome =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "income"
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

  const totalExpenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

  const balance = totalIncome - totalExpenses;
  const expenseCategories =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (
          acc: Record<string, number>,
          transaction
        ) => {

          const category =
            transaction.category;

          acc[category] =
            (acc[category] || 0)
            + transaction.amount;

          return acc;

        },
        {}
      );
  const expenseChartData =
    Object.entries(
      expenseCategories
    ).map(
      ([category, amount]) => ({
        category,
        amount
      })
    );
  console.log("Expense Chart Data:", expenseChartData);

  const monthlyExpenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (
        acc: Record<string, number>,
        transaction
      ) => {

        const month =
          new Date(
            transaction.date
          ).toLocaleDateString(
            "en-IN",
            {
              month: "short",
              year: "numeric"
            }
          );

        acc[month] =
          (acc[month] || 0)
          + transaction.amount;

        return acc;

      },
      {}
    );
  const monthlyExpenseData =
    Object.entries(
      monthlyExpenses
    ).map(
      ([month, amount]) => ({
        month,
        amount
      })
    );

  const filteredTransactions = transactions.filter(
    (transaction) => {

      const matchesSearch =
        transaction.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =
        filterType === "all"
          ? true
          : transaction.type === filterType;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );
  const largestExpense =
    Object.entries(
      expenseCategories
    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

  const largestExpensePercentage = largestExpense
    ? (
      (largestExpense[1] /
        totalExpenses) *
      100
    ).toFixed(1)
    : "0";

  const currentDate = new Date();

  const currentMonth =
    currentDate.getMonth();

  const currentYear =
    currentDate.getFullYear();

  const previousMonth =
    currentMonth === 0
      ? 11
      : currentMonth - 1;

  const previousMonthYear =
    currentMonth === 0
      ? currentYear - 1
      : currentYear;

  const currentMonthExpenses =
    transactions
      .filter(
        (transaction) => {

          if (
            transaction.type !==
            "expense"
          ) {
            return false;
          }

          const date =
            new Date(
              transaction.date
            );

          return (
            date.getMonth() ===
            currentMonth &&
            date.getFullYear() ===
            currentYear
          );
        }
      )
      .reduce(
        (sum, transaction) =>
          sum +
          transaction.amount,
        0
      );

  const previousMonthExpenses =
    transactions
      .filter(
        (transaction) => {

          if (
            transaction.type !==
            "expense"
          ) {
            return false;
          }

          const date =
            new Date(
              transaction.date
            );

          return (
            date.getMonth() ===
            previousMonth &&
            date.getFullYear() ===
            previousMonthYear
          );
        }
      )
      .reduce(
        (sum, transaction) =>
          sum +
          transaction.amount,
        0
      );
  const expenseChangePercentage =
    previousMonthExpenses > 0
      ? (
        (
          (
            currentMonthExpenses -
            previousMonthExpenses
          ) /
          previousMonthExpenses
        ) *
        100
      ).toFixed(1)
      : "0";
  return (
    <div className="app-container">
      <SignedOut>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px"
          }}
        >
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px"
            }}
          >
            <UserButton />
          </div>
          <h1>Personal Finance Tracker</h1>

          <DashboardSummary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
          <ExpensePieChart data={expenseChartData} />
          <IncomeExpenseChart income={totalIncome} expenses={totalExpenses} />
          <MonthlyExpenseTrend data={monthlyExpenseData} />
          <button disabled={aiLoading} onClick={generateAIInsights} className="ai-button">
            {
              aiLoading ? "Generating..." : "Generate AI Insights"
            }
          </button>
          {
            aiLoading && (
              <p>
                Generating insights...
              </p>
            )
          }

          {
            aiInsights && (
              <div className="ai-insights-box">

                <h2>
                  Gemini Financial Advisor
                </h2>

                <div className="ai-text">
                  {aiInsights.split("* ").map((item, index) =>
                    item.trim() ? (
                      <p key={index}>• {item.trim()}</p>
                    ) : null
                  )}

                </div>

              </div>
            )
          }
          <AIInsights largestExpense={largestExpense} largestExpensePercentage={largestExpensePercentage} balance={balance} currentMonthExpenses={currentMonthExpenses}
            previousMonthExpenses={previousMonthExpenses} expenseChangePercentage={expenseChangePercentage} />

          {
            error && <p>{error}</p>
          }

          <h2>Add Transaction</h2>

          <TransactionForm amount={amount} category={category} type={type} description={description}
            setAmount={setAmount} setCategory={setCategory} setType={setType} setDescription={setDescription} onSubmit={handleSubmit} />

          <hr />
          <div className="filter-bar">

            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              } />

          </div >
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>

            <option value="all">All</option>

            <option value="income">Income</option>

            <option value="expense">Expense</option>

          </select>

          <h2>Transactions</h2>
          <p>
            Total Transactions: {" "} {filteredTransactions.length}
          </p>



          {
            filteredTransactions.map(
              (transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )
            )
          }
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
