"use client"

import {useEffect} from 'react';
import NewEntryForm from '@/components/Forms/NewEntryForm';
import CalendarComponent from '@/components/Calendar/CalendarComponent';
import mockUserData from '../../../data/mockData.json';
import SummarySection from '@/components/Summary/SummarySection';
import NavBar from '@/components/NavBar/NavBar';
import { useAuthContext } from '@/context/authContext';
import {useRouter} from 'next/navigation';
import { useUserContext } from '@/context/userContext';

function profilePage() {

    const router = useRouter();
    const {userLogs, getUserLogs} = useUserContext();

    const {isLogin} = useAuthContext();
    //need to change sessions to cookie


    useEffect(()=>{
            getUserLogs();
    },[])
    


    return (
        <div>
            <h1>Welcome Username</h1>
            <NavBar/>
            <CalendarComponent/>
            <SummarySection/>
            <NewEntryForm/>
        </div>
    )
}

export default profilePage;