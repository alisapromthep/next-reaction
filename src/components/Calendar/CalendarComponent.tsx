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
                    const timestamp = Date.parse(log.date);
                    let inputDate = new Date(timestamp)
                    // console.log(timestamp,'timestamp')
                    // console.log(log.date)
                    // console.log(inputDate,'inputDate')
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