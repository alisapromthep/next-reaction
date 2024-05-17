"use client"

import {useState, useRef} from 'react';
import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {getTodaysDate, getTimeNow} from "../../utility/dateAndTime";
import { addNewEntry } from "@/utility/formFunction";




const NewEntryForm = ()=>{

    const [date, setDate] = useState(getTodaysDate());
    const [time, setTime] = useState(getTimeNow());

    const newEntryFormRef = useRef<HTMLFormElement>(null)

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    }

    return (
        <form
        ref={newEntryFormRef}
        className="bg-gray mb-20"
        action={async (formData) => {
            await addNewEntry(formData);
            newEntryFormRef.current?.reset()
            }}
        >
            <label className="capitalize flex flex-col">
                date
                <input
                required
                className=""
                type='date'
                value={date}
                name='date'
                onChange={handleDateChange}
                />
            </label>
            <label className="capitalize flex flex-col">
                What time did the reaction happen?
                <input
                required
                className=""
                type='time'
                value={time}
                name='time'
                onChange={handleTimeChange}
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