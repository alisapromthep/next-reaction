"use client"

import NewEntryForm from '@/components/Forms/NewEntryForm';
import CalendarComponent from '@/components/Calendar/CalendarComponent';
import mockUserData from '../../../data/mockData.json';
import SummarySection from '@/components/Summary/SummarySection';
import NavBar from '@/components/NavBar/NavBar';
import { useAuthContext } from '@/context/authContext';
import {useRouter} from 'next/navigation';

function profilePage() {

    const router = useRouter();

    const {isLogin} = useAuthContext();

    if(!isLogin){
        router.push('/')
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