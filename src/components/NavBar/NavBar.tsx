"use client"

import {AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai';
import {TiDocumentAdd} from 'react-icons/ti';
import { useAuthContext } from '@/context/authContext';
import Link from 'next/link';

const NavBar = ()=>{

    const {currentUser, handleLogout} = useAuthContext();
    const handleClick = ()=> console.log("click")


    return (
        <nav className="p-2.5 sticky bottom-0 w-full md:top-0 text-white bg-orange flex justify-evenly md:justify-between">
            <div className="hidden lg:block">
                <h1 className='p-2.5 text-3xl'>{currentUser.username}</h1>
            </div>
            <div className='flex justify-evenly'>
                <button 
                onClick={handleClick}
                className='md:px-4 flex flex-col items-center'><AiOutlineCalendar id="calendar"
                className='text-3xl'/> Calendar </button>
                <Link
                href="/forms"
                className='md:px-4 flex flex-col items-center'
                >
                    <TiDocumentAdd id="newEntry" className='text-3xl'/>
                    New
                </Link>
                <button
                onClick={handleLogout}
                className='md:px-4 flex flex-col items-center'>< AiOutlineLogout id="logout" className='text-3xl'/>Log out</button>
            </div>
        </nav>
    )
}

export default NavBar;