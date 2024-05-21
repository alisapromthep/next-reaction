"use client"

import {useState, useRef, useEffect} from 'react';
import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {getTodaysDate, getTimeNow, convertDate, convertTime} from "../../utility/dateAndTime";
import { addNewEntry, editEntryByID } from "@/utility/formFunction";
import { useUserContext } from '@/context/userContext';

interface formDataType {
    date: string;
    time: string;
    foodOption: string;
    symptoms: string[];
    notes: string;
}

interface formType {
    editEntry: boolean;
    buttonText: string;
    postID: string;
}

const NewEntryForm = ({editEntry, buttonText, postID}: formType)=>{

    const {getEntryByID} = useUserContext();

    const initialFormData = {
        date: getTodaysDate(),
        time: getTimeNow(),
        foodOption: "",
        symptoms: [],
        notes: ""
    }

    const [formData, setFormData] = useState<formDataType>(initialFormData);


    //if editing mode then, must retrive info for that post 

    useEffect(()=>{

        if(editEntry){
            let entry = getEntryByID(postID);
            entry.then(res => {
                console.log(res)

                const {id, time_of_day, food, symptom, notes} = res;

                setFormData({
                    date: convertDate(time_of_day),
                    time: convertTime(time_of_day),
                    foodOption:food,
                    symptoms: symptom.split(" "),
                    notes: notes,
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[editEntry])

    const newEntryFormRef = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckBoxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;

        setFormData(prev => {
            if(checked){
                return {
                    ...prev,
                    [name]:[...prev[name], value]
                }
            } else{
                return {
                    ...prev,
                    [name]: prev[name].filter((item:string)=> item !== value)
                }
            }
        })
    }

    const handleFoodChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
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

            if(editEntry){
                await editEntryByID(formData);
            } else{
                await addNewEntry(formData);
            }

            newEntryFormRef.current?.reset();
            setFormData(initialFormData);
            }}
        >
            {
                editEntry ? 
                <input type="hidden" name="postID" value={postID}/>:
                <></>
            }
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
                                checked={formData.symptoms.includes(symptom.name)}
                                onChange={handleCheckBoxChange}
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
                                checked={formData.foodOption === food.name}
                                onChange={handleFoodChange}
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
            text={buttonText}
            buttonType="submit"
            />
        </form>

    )
}

export default NewEntryForm;