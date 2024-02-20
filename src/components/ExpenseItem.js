import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, getAllMatchingItems } from "../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";


export default function ExpeneseItem({expense, showBudget})
{
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category : "budgets",
        key : "id",
        value : expense.budgetId
    })[0];
    return(<>
        <td >{expense.name}</td>
        <td >{formatCurrency(expense.amount)}</td>
        <td >{new Date(expense.createAt).toLocaleDateString()}</td>
        {showBudget && budget ? <td>
                            <Link to={`/budgets/${budget.id}`}
                                    style={{ "--accent" : budget.color }}>
                                {budget.name}  
                            </Link> 
                        </td> : ""
        }
        <td>
            <fetcher.Form method="post"
                            onSubmit={(e) =>{
                                if(!window.confirm("Are You Sure went to delete.")) e.preventDefault();
                            }}>
                <input type="hidden" name="_action"
                        value="deleteExpense"/>
                <input type="hidden" name="expenseId" value={expense.id}/>
                <button type="submit"
                        className="btn btn--dark"
                        aria-label={`Delete ${expense.name} expense`}>
                            <TrashIcon width={20}/>
                        </button>
            </fetcher.Form>
        </td>
    </>)
}