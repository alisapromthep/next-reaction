"use client"

import Calendar from 'react-calendar';
import './CalendarComponent.css';
import mockUserData from '../../data/mockData.json';
import CalendarEvent from './CalendarEvent';
import { useUserContext } from '@/context/userContext';
import {convertDate, convertTime} from '@/utility/dateAndTime';

function CalendarComponent(){

    const {userLogs} = useUserContext();
    return (
        <Calendar
        className="h-min md:max-w-lg lg:max-w-xl"
        tileContent={({date,view})=>{
            return(
                userLogs.map((log)=>{
                    let inputDate = new Date(log.timestamp)
                    return view === 'month' && date.toLocaleDateString() === inputDate.toLocaleDateString() ? 
                    <CalendarEvent
                    food={log.food}/> : null
                })
            )
        }}
        />

    )
}

export default CalendarComponent;