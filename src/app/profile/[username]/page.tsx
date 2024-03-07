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
    const {getUserLogs} = useUserContext();

    const {isLogin} = useAuthContext();
    const loginToken = sessionStorage.getItem('token');

    useEffect(()=>{
        getUserLogs();
    },[])

    if(!isLogin || !loginToken){
        router.push('/login')
    }


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