import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'
import { Form, useFetcher } from 'react-router-dom'

export default function AddBudgetForm() {
    const fetcher = useFetcher();
    const error = fetcher.data; 
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();
    useEffect(()=>{
    if(!isSubmitting) {
        formRef.current.reset();
        focusRef.current.focus();
    }
    },[isSubmitting])
  return (
    <div className='form-wrapper'>
        <h2 className='h3'>
            Create Budget
        </h2>
        <fetcher.Form
            method='post'
            className='gird-sm '
            ref={formRef}
        >
        
            <div className="grid-xs">
                <label htmlFor="newBudget">New Budget</label>
                <input type="text" 
                        name='newBudget'
                        id='newBudget'
                        placeholder='e.g., Groceries'
                        ref={focusRef}
                />
                {error?.newBudget && <small>{error.newBudget}</small>}
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" 
                        step='0.01'
                        name='newBudgetAmount'
                        id='newBudgetAmount'
                        placeholder='e.g., $350'
                        inputMode='decimal'
                />
                {error?.newBudgetAmount && <small>{error.newBudgetAmount}</small>}
            </div>
            <input type="hidden" name='_action' value='createBudget' />
            <button type='submit' 
                    className='btn btn--dark' 
                    style={{ marginTop: '10px' }}
                    disabled={isSubmitting}>
                {isSubmitting ? 
                                <span>Submitting...</span> : 
                                (<>
                                    <span>Create Budget</span>
                                    <CurrencyDollarIcon width={20}/>
                                </>)}
            </button>
        </fetcher.Form>
    </div>
  )
}
