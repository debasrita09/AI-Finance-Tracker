
import "./DashboardSummary.css";
interface DashboardSummaryProps {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}

function DashboardSummary({
    totalIncome,
    totalExpenses,
    balance
}: DashboardSummaryProps) {
    return (
        <div className="dashboard-summary">
            <div className="summary-card">
                <h3>Current Balance: {balance}</h3>
            </div>

            <div className="summary-card">
                <h3>Total Income: {totalIncome}</h3>
            </div>

            <div className="summary-card">
                <h3>Total Expenses: {totalExpenses}</h3>
            </div>
        </div>
    );
}

export default DashboardSummary;