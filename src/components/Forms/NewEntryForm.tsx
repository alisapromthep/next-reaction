"use client"

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {getTodaysDate, getTimeNow} from "../../utility/dateAndTime";
import { addNewEntry } from "@/utility/formFunction";


const NewEntryForm = ()=>{

    interface formInfo {
        [key: string]: string;
    }

    const initialForm = {
        date: getTodaysDate(),
        time: getTimeNow(),
        notes: ""
    }

    const [selectSymptoms, setSelectSymptoms] = useState<string[]>([]);
    const [selectFoods, setSelectFoods] = useState<string[]>([]);
    const [formInfo, setFormInfo] = useState<formInfo>(initialForm)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = event.target;
        setFormInfo(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

    }

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
        const check = event.target.checked;
        const selected = event.target.value;

        //check if the checked is true or false, to avoid double when uncheck
        if(check){
            setSelectFoods((prev)=> [...prev, selected])
        } else{
            setSelectFoods((prev)=> {
                return prev.filter((name)=> name !== selected)
            })
        }
    }

    const handleSummit = (event) =>{
        event.preventDefault();
        console.log(selectSymptoms)
        console.log(selectFoods)
        console.log(formInfo)


        const newEntry = {
            "user_id": pb.authStore.model.id,
            "time_of_day": `${formInfo.date} ${formInfo.time}`,
            "food":selectFoods.join(","),
            "symptom":selectSymptoms.join(","),
            "notes": formInfo.notes
        }


    }



    return (
        <form
        className="bg-gray"
        action={addNewEntry}
        >
            <label className="capitalize flex flex-col">
                date
                <input
                required
                className=""
                type='date'
                value={initialForm.date}
                name='date'
                onChange={handleChange}
                />
            </label>
            <label className="capitalize flex flex-col">
                What time did the reaction happen?
                <input
                required
                className=""
                type='time'
                value={initialForm.time}
                name='time'
                onChange={handleChange}
                />
            </label>

            <fieldset className="grid grid-cols-5 border-2 rounded-lg bg-white">
                <legend>What was the reaction?</legend>
                {
                    symptomIcons.map((symptom,i)=>{
                        return (
                            <label
                            key={i}
                            className="flex flex-col items-center w-24"
                            >
                                <CldImage
                                    width={35}
                                    height={35}
                                    src={symptom.img_file}
                                    alt={symptom.name}
                                />
                                {symptom.name}
                                <input
                                type="checkbox"
                                value={symptom.name}
                                onChange={handleSymptoms}
                                />
                            </label>
                        )
                    })
                }
            </fieldset>
            <fieldset className="grid grid-cols-5 border-2 rounded-lg bg-white ">
                <legend>What did you eat?</legend>
                {
                    foodIcons.map((food,i)=>{
                        return (
                            <label key={i} className="flex flex-col items-center w-24">
                                <CldImage
                                width={35}
                                height={35}
                                src={food.img_file}
                                alt={food.name}                                
                                />
                                {food.name}
                                <input
                                type="checkbox"
                                value={food.name}
                                onChange={handleFoods}
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
                onChange={handleChange}
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