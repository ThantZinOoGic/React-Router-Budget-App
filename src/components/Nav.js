//react router dom
import { Form, NavLink } from 'react-router-dom';

//assets
import logomark from '../assets/logomark.svg';

//lib
import { TrashIcon } from '@heroicons/react/24/solid';

export default function Nav({userName}) {
  return (
    <nav>
        <NavLink to='/'>
            <img src={logomark} height={30}/>
            <p>HomeBudget</p>
        </NavLink>
        {
            userName && (
                <Form method='post' 
                      action='/logout'
                      onSubmit={(e)=>{
                        if(!window.confirm('Delete user and all data!')){
                            e.preventDefault();
                        }
                      }}>
                    <button type='submit' className='btn btn--warning'>
                        <span>Delete </span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
            )
        }
    </nav>
  )
}
