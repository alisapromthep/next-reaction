"use client"

import Header from '@/components/Header/Header';
import {groupBy }from '@/utility/groupBy';
import foodIcons from '../Forms/foodIcons.json';
import SummaryDetail from './SummaryDetail';
import { useUserContext } from '@/context/userContext';


function SummarySection(){

    const {userLogs, setEditEntry, setPostID} = useUserContext();
    const groupByFood = groupBy('food', userLogs);
    
    let groupLogArray = [];

    for (const property in groupByFood) {
        const foodKey = property;
        const foodLog = groupByFood[property];
        const logDetail = {[foodKey]: foodLog};
        groupLogArray.push(logDetail);
    }
    
    return (
        <article className=' bg-green-light p-2 rounded-xl'>
            <Header headerText='allergy logs'/>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-1 '>
            {
            groupLogArray.map((food,i)=>{
                const foodKey = Object.keys(food).toString()
                const foodLog = food[foodKey]
                const postID = food[foodKey]
                const foodIcon = (foodIcons.find((icon)=> icon.name === foodKey))
                if(foodIcon === undefined){
                    return;
                }
                return <SummaryDetail
                key={i}
                foodKey={foodKey}
                foodLog={foodLog}
                foodIcon={foodIcon}
                setEditEntry={setEditEntry}
                setPostID= {setPostID}
                />
            })
            }
            </div>
        </article>
    )
}

export default SummarySection;