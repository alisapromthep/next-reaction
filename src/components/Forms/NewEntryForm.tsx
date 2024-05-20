"use client"

import {useState, useRef} from 'react';
import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {getTodaysDate, getTimeNow} from "../../utility/dateAndTime";
import { addNewEntry } from "@/utility/formFunction";

interface formDataType {
    date: string;
    time: string;
    foodOption: string;
    symptoms: string[];
    notes: string;
}

const NewEntryForm = ()=>{

    const initialFormData = {
        date: getTodaysDate(),
        time: getTimeNow(),
        foodOption: "",
        symptoms: [],
        notes: ""
    }

    const [date, setDate] = useState(getTodaysDate());
    const [time, setTime] = useState(getTimeNow());
    const [formData, setFormData] = useState<formDataType>(initialFormData)

    const newEntryFormRef = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form
        ref={newEntryFormRef}
        className="bg-gray mb-20"
        action={async (formData) => {
            await addNewEntry(formData);
            newEntryFormRef.current?.reset();
            setDate(getTodaysDate());
            setTime(getTimeNow());
            }}
        >
            <label className="capitalize flex flex-col">
                date
                <input
                required
                className=""
                type='date'
                value={formData.date}
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
                value={formData.time}
                name='time'
                onChange={handleChange}
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