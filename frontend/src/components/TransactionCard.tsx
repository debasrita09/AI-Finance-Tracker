import { type Transaction } from "../types/transaction";
import "./TransactionCard.css";

interface TransactionCardProps {
    transaction: Transaction;
    onDelete: (id: number) => void;
    onEdit: (transaction: Transaction) => void;
}

function TransactionCard({transaction, onDelete, onEdit}: TransactionCardProps) {
    return (
        <div  className="transaction-card">
            <p>Amount:{" "}₹{transaction.amount}</p>

            <p>Category:{" "}{transaction.category}</p>

            <p>Type:{" "}{transaction.type}</p>

            <p>Description:{" "} {transaction.description}</p>

            <p>Date:{" "}{new Date(transaction.date).toLocaleDateString("en-IN", {day: "numeric", month: "short", year: "numeric"})}</p>

            <div className="card-buttons">
                <button className="edit-btn" onClick={() => onEdit(transaction)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(transaction.id)}>Delete</button>
            </div>
        </div>
    )
}
export default TransactionCard;