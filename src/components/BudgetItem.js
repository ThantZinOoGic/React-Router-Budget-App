import React from 'react'
import { calculateSpentByBudget, formatCurrency, formatingPercentage } from '../helpers';
import { Form, Link } from 'react-router-dom';
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";


export default function BudgetItem({budget, showDelete=false}) {
    let {id, name, amount, color} = budget;
    let spent = calculateSpentByBudget(id);
  return (
    <div className='budget'
          style={{ 
            "--accent" : color
           }}>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount) } Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
          {formatingPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)} spent</small>
            <small> {formatCurrency(amount - spent)} remaining</small>
        </div>
        {
          showDelete ? (<div className='flex-sm'>
            <Form method='post'
                  action='delete'
                  onSubmit={
                    (e)=> {
                      if( !window.confirm("Are Your sure Delete!"))
                        {
                          e.preventDefault();
                        }
                    } 
                  }>
              <button type='submmit' className='btn'>
                <span>Delete Budget</span>
                <TrashIcon width={20}/>
              </button>
            </Form>
          </div>) : (<div className='flex-sm'>
            <Link to={`/budgets/${id}`}
                  className='btn'>
              <span>Show Detail</span>
              <BanknotesIcon width={20}/>
            </Link>
          </div>)
        }
    </div>
  )
}
