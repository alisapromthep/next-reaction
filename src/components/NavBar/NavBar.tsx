"use client"

import {AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai';
import {TiDocumentAdd} from 'react-icons/ti';

const NavBar = ()=>{

    const handleClick = ()=> console.log("click")

    return (
        <nav className="py-2.5 fixed right-0 text-white bg-orange rounded-l-full flex justify-evenly w-1/2">
            <button 
            onClick={handleClick}
            className='flex flex-col items-center'><AiOutlineCalendar id="calendar"
            className='text-3xl'/> Calendar </button>
            <button
            onClick={handleClick}
            className='flex flex-col items-center'><TiDocumentAdd id="newEntry" className='text-3xl'/> New</button>
            <button
            onClick={handleClick}
            className='flex flex-col items-center'>< AiOutlineLogout id="logout" className='text-3xl'/>Log out</button>
        </nav>
    )
}

export default NavBar;