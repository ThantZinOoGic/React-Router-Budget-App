// react router dom hook
import { Outlet, useLoaderData } from 'react-router-dom';

//assets
import wave from '../assets/wave.svg';

//helper functions
import { fetchData } from '../helpers';
import Nav from '../components/Nav';

export function mainLoader ()
{
    let userName = fetchData('userName');
    return {userName};
}

export default function Main() {
  const {userName} = useLoaderData();
  return (
    <div className='layout'>
        <Nav userName={userName}/>
        <main>
            <Outlet/>
        </main>
        <img src={wave}/>
    </div>
  )
}
