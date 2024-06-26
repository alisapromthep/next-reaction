"use client"

import {useEffect, useState} from 'react';
import NewEntryForm from '@/components/Forms/NewEntryForm';
import CalendarComponent from '@/components/Calendar/CalendarComponent';
import SummarySection from '@/components/Summary/SummarySection';
import NavBar from '@/components/NavBar/NavBar';
import { useAuthContext } from '@/context/authContext';
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';

function profilePage() {

    const router = useRouter();

    const {userLogs, getUserLogs} = useUserContext();
    const {currentUser, isLogin} = useAuthContext();
    

    useEffect(()=>{
        if(!isLogin){
            return router.push('/')}
    },[])

    useEffect(()=>{
        getUserLogs();
    },[userLogs])

    return (
        <div className='pb-4'>
            <NavBar/>
            <h1 className='lg:hidden text-center'>Welcome {currentUser.username}</h1>
            <div className='p-4'>
                <div className='grid justify-items-center lg:grid-cols-2'>
                    <CalendarComponent/>
                    <div className='lg:order-first'>
                        <SummarySection/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profilePage;