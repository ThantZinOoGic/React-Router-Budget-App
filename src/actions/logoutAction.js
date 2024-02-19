//react router dom
import { redirect } from "react-router-dom";

//helper
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

//lib

export async function logoutAction()
{
    //delete user
    deleteItem('userName');
    //delete budget
    deleteItem('budgets');
    //delete expense
    deleteItem('expenses');


    toast.success("You've deleted your account!")
    //redirect
    return redirect('/');
}