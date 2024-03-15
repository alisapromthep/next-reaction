"use client"

import {AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai';
import {TiDocumentAdd} from 'react-icons/ti';
import { useAuthContext } from '@/context/authContext';

const NavBar = ()=>{

    const {handleLogout} = useAuthContext();
    const handleClick = ()=> console.log("click")

    return (
        <nav className="py-2.5 fixed bottom-0 w-full md:right-0 text-white bg-orange md:rounded-l-full flex justify-evenly w-1/2">
            <button 
            onClick={handleClick}
            className='flex flex-col items-center'><AiOutlineCalendar id="calendar"
            className='text-3xl'/> Calendar </button>
            <button
            onClick={handleClick}
            className='flex flex-col items-center'><TiDocumentAdd id="newEntry" className='text-3xl'/> New</button>
            <button
            onClick={handleLogout}
            className='flex flex-col items-center'>< AiOutlineLogout id="logout" className='text-3xl'/>Log out</button>
        </nav>
    )
}

export default NavBar;