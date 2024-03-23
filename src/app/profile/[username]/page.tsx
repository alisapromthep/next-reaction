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
            <h1 className='text-center'>Welcome {currentUser.username}</h1>
            <div className='px-4'>
                <div className='grid md:grid-cols-2'>
                    <CalendarComponent/>
                    <div className=''>
                        <SummarySection/>
                    </div>
                </div>
                <NewEntryForm/>
            </div>
        </div>
    )
}

export default profilePage;