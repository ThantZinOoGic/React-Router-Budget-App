// react router dom hook
import { Link, useLoaderData } from 'react-router-dom';

//component

import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';

//helper functions
import { createBudget, createExpense, fetchData, delay, deleteItem } from '../helpers';
import { toast } from 'react-toastify';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import ExpeneseTable from '../components/ExpenseTable';

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
    //new user submition
    if(_action == 'newUser')
    {
      try {
        localStorage.setItem('userName', JSON.stringify(values.userName))
        return toast.success(`welcome  ${values.userName}`);
      } catch {
        throw new Error("There was a problem creating your account");
      }
    }

    //budget

    if(_action == "createBudget")
    {
      try {
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

    if(_action == "createExpense")
    {
      try {
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

    //delete expensess
    if(_action == 'deleteExpense')
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
        userName ? (<div className='dashboard'>
          <h1>Welcome Back <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {budgets && budgets.length >0 ? 
                    <div className="grid-lg">
                      <div className="flex-lg">
                        <AddBudgetForm/>
                        <AddExpenseForm budgets = {budgets}/>
                      </div>
                      <h2>Existing Budgets</h2>
                      <div className="budgets">
                        {
                          budgets.map((budget) => {
                            return <BudgetItem budget={budget}
                                                key={budget.id}/>
                          })
                        }
                      </div>
                      {
                        expenses && expenses.length > 0 
                        && (
                          <div className='grid-md'>
                              <h2>Recent Expenses</h2>
                              <ExpeneseTable expenses = {
                                    expenses.sort((a,b)=> {
                                    return b.createAt - a.createAt;
                                  }).slice(0,5)
                              }/>
                              {expenses.length > 5 && (
                                <Link to="expenses"
                                      className='btn btn--dark'>
                                  View All Expenses
                                </Link>
                              )}
                          </div>
                        )
                      }
                    </div> : 
                    <div className="grid-lg">
                      <p>Personal budgeting is the secret to financial freedom.</p>
                      <p>Create a budget to get start.</p>
                      <AddBudgetForm/>
                    </div> }
            
          </div>
        </div>) : <Intro/>
    }</div>
  )
}
