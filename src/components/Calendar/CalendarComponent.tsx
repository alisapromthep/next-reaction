"use client"

import Calendar from 'react-calendar';
import './CalendarComponent.css';
import mockUserData from '../../data/mockData.json';
import CalendarEvent from './CalendarEvent';

function CalendarComponent(){
    return (
        <Calendar
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