"use client"

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {getTodaysDate, getTimeNow} from "../../utility/dateAndTime";
import { addNewEntry } from "@/utility/formFunction";
import { get } from "http";


const NewEntryForm = ()=>{

    interface formInfo {
        [key: string]: string;
    }

    const [selectSymptoms, setSelectSymptoms] = useState<string[]>([]);
    const [selectFood, setSelectFood] = useState<string>("");

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    //     const { name, value } = event.target;
    //     setFormInfo(prev => (
    //         {
    //             ...prev,
    //             [name]: value
    //         }
    //     ));

    // }

    const handleSymptoms = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const check = event.target.checked;
        const selected = event.target.value;

        //check if the checked is true or false, to avoid double when uncheck
        if(check){
            setSelectSymptoms((prev)=> [...prev, selected])
        } else{
            setSelectSymptoms((prev)=> {
                return prev.filter((name)=> name !== selected)
            })
        }
    }

    const handleFoods = (event: React.ChangeEvent<HTMLInputElement>) =>{

        console.log(event.target.value)
        setSelectFood(event.target.value)
    }

    const addNewEntryWithInfo = addNewEntry.bind(FormData,selectSymptoms)


    return (
        <form
        className="bg-gray mb-20"
        action={addNewEntryWithInfo}
        >
            <label className="capitalize flex flex-col">
                date
                <input
                required
                className=""
                type='date'
                value={getTodaysDate()}
                name='date'
                />
            </label>
            <label className="capitalize flex flex-col">
                What time did the reaction happen?
                <input
                required
                className=""
                type='time'
                value={getTimeNow()}
                name='time'
                />
            </label>
            <fieldset className="p-2 grid grid-cols-4 md:grid-cols-5 border-2 rounded-lg bg-white">
                <legend>What was the reaction?</legend>
                {
                    symptomIcons.map((symptom,i)=>{
                        return (
                            <label
                            key={i}
                            className="text-sm flex flex-col items-center w-24"
                            >
                                <CldImage
                                    width={30}
                                    height={30}
                                    src={symptom.img_file}
                                    alt={symptom.name}
                                />
                                {symptom.name}
                                <input
                                type="checkbox"
                                value={symptom.name}
                                name="symptoms"
                                onChange={handleSymptoms}
                                />
                            </label>
                        )
                    })
                }
            </fieldset>
            <fieldset className="p-2 grid grid-cols-4 md:grid-cols-5 border-2 rounded-lg bg-white ">
                <legend>What did you eat?</legend>
                {
                    foodIcons.map((food,i)=>{
                        return (
                            <label key={i} className="text-sm flex flex-col items-center w-24">
                                <CldImage
                                width={30}
                                height={30}
                                src={food.img_file}
                                alt={food.name}                                
                                />
                                {food.name}
                                <input
                                type="radio"
                                value={food.name}
                                name="foodOption"
                                />
                            </label>
                        )
                    })
                }
            </fieldset>
            <label className="capitalize flex flex-col">
                notes, additional info
                <input
                type="text"
                name="notes"
                />
            </label>
            <Button
            text="Noted"
            buttonType="submit"
            />
        </form>

    )
}

export default NewEntryForm;