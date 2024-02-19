import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers"
import ExpeneseTable from "../components/ExpenseTable";
import { toast } from "react-toastify";

export const expensesLoader = () => {
    let expenses = fetchData("expenses");
    return {expenses};
}

export async function expenseAction ({request}) {
    let data = await request.formData();
    let {_action, ...values} = Object.fromEntries(data);
    if(_action == 'deleteExpense')
    {
      try {
        deleteItem({
          key : "expenses",
          id : values.expenseId
        });
        return toast.success(`Expense Deleted`);
      } catch {
        throw new Error("There was a problem deleting your expenses");
      }
    }
}
export default function ExpensesPage() {
    const {expenses} = useLoaderData();
  return (
    <div className="grid-lg">
        <h1>All Expenses</h1>
        {expenses && expenses.length > 0 ?
            (
                <div className="grid-md">
                    <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                    <ExpeneseTable expenses={expenses}/>
                </div>

            ) :
            <div>No Expenses To Show</div>
        }
    </div>
  )
}
