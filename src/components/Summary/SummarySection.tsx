"use client"

import Header from '@/components/Header/Header';
import {groupBy }from '@/utility/groupBy';
import mockUserData from '@/data/mockData.json';
import foodIcons from '../Forms/foodIcons.json';
import SummaryDetail from './SummaryDetail';

function SummarySection(){

    const groupByFood = groupBy('food', mockUserData);
    
    let groupLogArray = [];

    for (const property in groupByFood) {
        const foodKey = property;
        const foodLog = groupByFood[property];
        const logDetail = {[foodKey]: foodLog};
        groupLogArray.push(logDetail);
    }

    console.log(groupLogArray)
    
    return (
        <article>
            <Header headerText='Allergy log'/>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-green-light p-2 rounded-xl'>
            {
            groupLogArray.map((food)=>{
                const foodKey = Object.keys(food).toString()
                const foodLog = food[foodKey]
                const foodIcon = (foodIcons.find((icon)=> icon.name === foodKey))
                return <SummaryDetail
                foodKey={foodKey}
                foodLog={foodLog}
                foodIcon={foodIcon}
                //handleDelete={handleDelete}
                />
            })
            }
            </div>
        </article>
    )
}

export default SummarySection;