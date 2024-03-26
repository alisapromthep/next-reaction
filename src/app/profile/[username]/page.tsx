"use client"

import {useEffect} from 'react';
import NewEntryForm from '@/components/Forms/NewEntryForm';
import CalendarComponent from '@/components/Calendar/CalendarComponent';
import mockUserData from '../../../data/mockData.json';
import SummarySection from '@/components/Summary/SummarySection';
import NavBar from '@/components/NavBar/NavBar';
import { useAuthContext } from '@/context/authContext';
import { useUserContext } from '@/context/userContext';

function profilePage() {

    const {userLogs, getUserLogs} = useUserContext();
    const {currentUser} = useAuthContext();


    useEffect(()=>{
            getUserLogs();
    },[])
    


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
                <NewEntryForm/>
            </div>
        </div>
    )
}

export default profilePage;