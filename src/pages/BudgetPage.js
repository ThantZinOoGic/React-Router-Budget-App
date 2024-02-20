import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers"
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpeneseTable from "../components/ExpenseTable";
import { toast } from "react-toastify";

export async function budgetLoader({params})
{
    const budget = await getAllMatchingItems({
        category : "budgets",
        key : "id",
        value : params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category : "expenses",
        key : "budgetId",
        value : params.id
    });

    if(!budget){
        throw new Error("You try to find dosen't have budget")
    }
    return {budget, expenses};
}


export async function budgetAction ({request}) {
    let data = await request.formData();
    let {_action, ...values} = Object.fromEntries(data);
    let error = {};
    
    if(_action == "createExpense")
    {
      try {
        if(values.newExpense.length === 0){
          error.newExpense = "Expense Name must have";
          return error;
        }
        if(values.newExpenseAmount.length === 0){
          error.newExpenseAmount = "Expense Amount must have";
          return error;
        }
        //create budget
        createExpense({
          name : values.newExpense,
          amount : values.newExpenseAmount,
          budgetId : values.newExpenseBudget
        });

        //toast success message
        return toast.success(`Expense ${values.newExpense} Created`);
      } catch {
        throw new Error("There was a problem creating your Expenese");
      }
    }


    if(_action == 'deleteExpense')
    {
      try {
        deleteItem({
          key : "expenses",
          id : values.expenseId
        });
        return toast.success(`Expense Deleted`);
      } catch {
        throw new Error("There was a problem deleting your expense");
      }
    }

    
}


export default function BudgetPage() {
    const {budget, expenses} = useLoaderData();
  return (
    <div className="grid-md"
        style={{ "--accent" : budget.color}}>
        <h2 className="h2">
            <span className="accent">{budget.name}</span> Overviews
        </h2>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true}/>
            <AddExpenseForm  budgets={[budget]}/>
        </div>
        {expenses && expenses.length > 0 && ( 
            <div className="grid-md">
                <h2><span className="accent">{budget.name}</span></h2>
                <ExpeneseTable expenses={expenses} showBudget={false}/>
            </div>
        )}
    </div>
  )
}
