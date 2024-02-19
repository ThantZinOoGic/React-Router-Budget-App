import React from 'react'
import { calculateSpentByBudget, formatCurrency, formatingPercentage } from '../helpers';

export default function BudgetItem({budget}) {
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
    </div>
  )
}
