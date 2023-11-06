import {useState} from 'react';
import {Link} from 'react-router-dom'
import MaybeShowNav from './MaybeShowNav'
import { useLocation } from 'react-router-dom';
import './Navigation.css'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineReviews } from 'react-icons/md'
import { GiHandBag } from 'react-icons/gi'
import { AiOutlineLock } from 'react-icons/ai'


export default function Navigation(){
    const location = useLocation();
    const user = location.state
    const iconSize = 20
    const [open, setOpen] = useState(false)
    let displayUser = ''

    if(user){
        if (user.isEmployer === 'Yes'){
            displayUser = user.company_login
        } else { displayUser = user.user_login}
    }

    function Dropdown(props){
        return(
            <li className='dropdownItem'>
                {props.img}
                <Link to={props.Link} state={user}>
                    <a className='ml-2 text-green-600 text-lg'>{props.text}</a>
                </Link>
            </li>
        )
    }

    return(
        <nav className='flex items-center justify-between w-full h-20 py-5 text-white border-b px-10 border-green-400'>
            <Link to='/' className='font-serif font-bold text-4xl'>
                <span className='font-bold text-4xl text-green-400'>J</span>ob
                <span className='font-bold text-4xl text-green-400'>Q</span>uest
            </Link>
            
            <MaybeShowNav>
                <ul className='flex items-center h-16 text-xl font-serif'>
                    <li className='font-bold'><Link to='/job' state={user}>
                        {/* <MdOutlineReviews size={iconSize}/> */}
                        Job
                    </Link></li>
                    <li className='ml-20 font-bold'><Link to='/company' state={user}>
                        {/* <GiHandBag size={iconSize}/> */}
                        Company
                    </Link></li>
                    <li className='ml-20'>
                        <CgProfile className='menu-trigger' size={30} onClick={() => {setOpen(!open)}}/>
                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                            <h3 className='text-center text-green-600 font-bold'>Hi {displayUser}!</h3>
                            <ul className={`${open? 'active' : 'inactive'}`} onClick={() => {setOpen(!open)}}>
                                <Dropdown img={<CgProfile size={iconSize} color='green'/>} text={'My Profile'} Link={'/profile'}/>
                                <Dropdown img={<AiOutlineLock size={iconSize} color='green'/>} text={'Security'} Link={'/profile'}/>
                            </ul>
                        </div>
                    </li>
                </ul>
            </MaybeShowNav>
        </nav>
    )
}