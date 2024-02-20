// react router dom hook
import {useLoaderData } from 'react-router-dom';

//component

import Intro from '../components/Intro';


//helper functions
import { createBudget, createExpense, fetchData, delay, deleteItem } from '../helpers';

//lib
import { toast } from 'react-toastify';
import Display from '../components/Display';


export function dashboardLoader ()
{
    let userName = fetchData('userName');
    let budgets = fetchData('budgets');
    let expenses = fetchData('expenses');
    return {userName, budgets, expenses};
}

export async function dashboardAction ({request})
{
    await delay();
    let data = await request.formData();
    let {_action, ...values} = Object.fromEntries(data);
    let error = {};

    //new user submition
    if(_action === 'newUser')
    {
      try {
        if(values.userName.length === 0){
          error.userName = "user name must have";
          return error;
        }
        localStorage.setItem('userName', JSON.stringify(values.userName))
        return toast.success(`welcome  ${values.userName}`);
      } catch {
        throw new Error("There was a problem creating your account");
      }
    }

    //budget

    if(_action === "createBudget")
    {
      try {
        if(values.newBudget.length === 0){
          error.newBudget = "Budget Name must have";
          return error;
        }
        if(values.newBudgetAmount.length === 0){
          error.newBudgetAmount = "Budget Amount must have";
          return error;
        }
        //create budget
          createBudget({
                        name : values.newBudget,
                        amount : values.newBudgetAmount
                      });
        //toast success message
        return toast.success(`Budget Created`);
      } catch {
        throw new Error("There was a problem creating your Budget");
      }
    }

    //expense

    if(_action === "createExpense")
    {
      try {
        //create budget
        createExpense({
          name : values.newExpense,
          amount : values.newExpenseAmount,
          budgetId : values.newExpenseBudget
        });
        if(values.newExpense.length === 0){
          error.newExpense = "Expense Name must have";
          return error;
        }
        if(values.newExpenseAmount.length === 0){
          error.newExpenseAmount = "Expense Amount  must have";
          return error;
        }
        //toast success message
        return toast.success(`Expense ${values.newExpense} Created`);
      } catch {
        throw new Error("There was a problem creating your Expenese");
      }
    }

    //delete expensess
    if(_action === 'deleteExpense')
    {
      try {
        deleteItem({
          key : "expenses",
          id : values.expenseId
        });
        return toast.success(`Expense Deleted`);
      } catch {
        throw new Error("There was a problem deleting your account");
      }
    }
  }

export default function Dashboard() {
  const {userName, budgets, expenses} = useLoaderData();
  return (
    <div>{
        userName ?  <Display userName = {userName} budgets= {budgets} expenses ={expenses}/> : <Intro/>
    }</div>
  )
}
