//react route dom
import { Link } from 'react-router-dom';

//component
import AddBudgetForm from "./AddBudgetForm";
import AddExpenseForm from "./AddExpenseForm";
import BudgetItem from "./BudgetItem";
import ExpeneseTable from "./ExpenseTable";



export default function Display({userName, budgets, expenses}) {
  return (
    (<div className='dashboard'>
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
  </div>)
  )
}
