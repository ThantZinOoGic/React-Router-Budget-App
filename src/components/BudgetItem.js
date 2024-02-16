import React from 'react'
import { calculateSpentByBudget, formatCurrency } from '../helpers';

export default function BudgetItem({budget}) {
    let {id, name, amount, color} = budget;
    let spent = calculateSpentByBudget(id);
  return (
    <div className='budget'>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount) } Budgeted</p>
        </div>
        <progress max='100' value={amount}>
        </progress>
        <div className="progress-text">
            <small>{spent} spent</small>
            <small> ...remaining</small>
        </div>
    </div>
  )
}
