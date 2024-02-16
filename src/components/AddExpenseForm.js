import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

export default function AddExpenseForm({budgets}) {
    const fetcher = useFetcher();
    const formRef = useRef()
    const focusRef = useRef();
    const isSubmitting = fetcher.state === "submitting";

    useEffect(()=> {
        if(!isSubmitting)
        {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])

  return (
    <div className='form-wrapper'>
        <h3 className="h3">
            Add New <span className="accent">
                { budgets.length === 1 &&  budgets.map(budget => budget.name + " ")}
            </span>
            Expense
        </h3>
        <fetcher.Form 
            method='post'
            className='grid-sm'
            ref={formRef}>
                <div className='expense-inputs'>
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" 
                                name='newExpense'
                                id='newExpense'
                                placeholder='e.g., coffee'
                                ref={focusRef}
                                required/>
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input type="number" 
                            step='0.01'
                            name='newExpenseAmount'
                            id='newExpenseAmount'
                            placeholder='e.g., $3.50'
                            required
                            inputMode='decimal'
                        />
                    </div>
                    <div className="grid-xs" hidden={budgets.length ==1}>
                        <label htmlFor="newExpenseBudget">Budget Category</label>
                        <select name='newExpenseBudget'
                                id='newExpenseBudget'
                                required>
                            {
                                budgets.sort((a,b)=> a.createAt - b.createAt).map(budget=>{
                                    return <option value={budget.id}
                                            key={budget.id}>
                                        { budget.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <input type="hidden" name='_action' value="createExpense"/>
                    <button type='submit' 
                            className='btn btn--dark' 
                            style={{ marginTop: '10px' }}
                            disabled={isSubmitting}>
                        {isSubmitting ? 
                            (<span> Submitting ...</span>) : 
                            (<div>
                                <span>Add Expense</span>
                                <PlusCircleIcon width={20}/>
                            </div>)}
                    </button>
                </div>

        </fetcher.Form>
    </div>
  )
}
