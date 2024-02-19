import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export  function deleteBudget({params})
{
    try {
        deleteItem({
            key : "budgets",
            id : params.id
        });
        const associatedExpensee = getAllMatchingItems({
            category : "expenses",
            key : "budgetId",
            value : params.id
        })
        associatedExpensee.forEach((expense)=>{
            deleteItem({
                key : "expenses",
                id : expense.id
            })
        })
        toast.success("budget deleted successfull");
    } catch (e) {
        throw new Error("There was a problem");
    }
    return redirect("/");
}