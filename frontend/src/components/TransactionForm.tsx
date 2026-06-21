
console.log("TransactionForm rendered");
import "./TransactionForm.css";
interface TransactionFormProps {
    amount: string;
    category: string;
    type: string;
    description: string;

    setAmount: (
        value: string
    ) => void;

    setCategory: (
        value: string
    ) => void;

    setType: (
        value: string
    ) => void;

    setDescription: (
        value: string
    ) => void;

    onSubmit: (
        e: React.FormEvent
    ) => void;
}

function TransactionForm({
    amount,
    category,
    type,
    description,
    setAmount,
    setCategory,
    setType,
    setDescription,
    onSubmit
}: TransactionFormProps) {

    return (
        <form className="transaction-form" onSubmit={(e) => {
            console.log("FORM SUBMITTED");
            onSubmit(e);
            }}
        >

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(
                        e.target.value
                    )
                }
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                    setCategory(
                        e.target.value
                    )
                }
            />

            <select
                value={type}
                onChange={(e) =>
                    setType(
                        e.target.value
                    )
                }
            >
                <option value="expense">
                    Expense
                </option>

                <option value="income">
                    Income
                </option>
            </select>

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>

            <button type="submit" onClick={() => console.log("BUTTON CLICKED")}>
                Add Transaction
            </button>

        </form>
    );
}



export default TransactionForm;