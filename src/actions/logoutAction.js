//react router dom
import { redirect } from "react-router-dom";

//helper
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

//lib

export async function logoutAction()
{
    //delete user
    deleteItem({
        key: 'userName',
    });
    //delete budget
    deleteItem({
        key : 'budgets',
    });
    //delete expense
    deleteItem({
        key : 'expenses',
    });


    toast.success("You've deleted your account!")
    //redirect
    return redirect('/');
}