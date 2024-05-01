"use client"

import Calendar from 'react-calendar';
import './CalendarComponent.css';
import mockUserData from '../../data/mockData.json';
import CalendarEvent from './CalendarEvent';
import { useUserContext } from '@/context/userContext';

function CalendarComponent(){

    const {userLogs} = useUserContext();
    
    return (
        <Calendar
        className="h-min md:max-w-lg lg:max-w-xl"
        tileContent={({date,view})=>{
            return(
                mockUserData.map((log)=>{
                    const timestamp = Date.parse(log.date);
                    let inputDate = new Date(timestamp)
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