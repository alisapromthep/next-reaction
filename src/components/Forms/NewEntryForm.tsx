"use client"

import {useState, useRef, useEffect} from 'react';
import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {getTodaysDate, getTimeNow, convertDate, convertTime} from "../../utility/dateAndTime";
import { addNewEntry, editEntryByID } from "@/utility/formFunction";
import { useUserContext } from '@/context/userContext';
import FormField from '../FormField/FormField';
import {FormFieldProps, FormData} from '@/components/FormField/types';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { errorToJSON } from 'next/dist/server/render';

interface formDataType {
    date: string;
    time: string;
    foodOption: string;
    symptoms: string[];
    customSymptom: string,
    notes: string;
}

interface formType {
    editEntry: boolean;
    buttonText: string;
    postID: string;
}

const NewEntryForm = ()=>{

    const {getEntryByID, editEntry, postID} = useUserContext();

    const initialFormData = {
        date: getTodaysDate(),
        time: getTimeNow(),
        foodOption: "",
        symptoms: [],
        customSymptom: "",
        notes: ""
    }

    const [formData, setFormData] = useState<formDataType>(initialFormData);
    console.log(editEntry,'edit in form')

    const {register, handleSubmit, formState:{errors}, setError} = useForm<FormData>();

    //if editing mode then, must retrive info for that post 

    useEffect(()=>{

        if(editEntry){
            let entry = getEntryByID(postID);
            entry.then(res => {
                console.log(res)

                const {id, time_of_day, food, symptom, notes, custom_symptom} = res;

                setFormData({
                    date: convertDate(time_of_day),
                    time: convertTime(time_of_day),
                    foodOption:food,
                    symptoms: symptom.split(" "),
                    customSymptom: custom_symptom,
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

    const handleCustomSymptom = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setFormData(prev => (
            {
                ...prev,
                customSymptom: value,
            }
        ))
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
                <FormField
                labelName='date'
                label='date'
                type='date'
                value={formData.date}
                name='date'
                handleChange={handleChange}
                register={register}
                error={errors.date}
                />
                <FormField
                labelName='time'
                label='What time did the reaction happen?'
                type='time'
                value={formData.time}
                name='time'
                handleChange={handleChange}
                register={register}
                error={errors.date}
                />
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
                <FormField
                labelName='customSymptom'
                label='others?'
                type='text'
                placeholder='add your own'
                value={formData.customSymptom}
                name='customSymptom'
                handleChange={handleCustomSymptom}
                register={register}
                error={errors.customSymptom}
                />
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
                {/* <input type='text'
                name='customFood'
                placeholder='others'/> */}
            </fieldset>
            <FormField
                labelName='notes'
                label='notes, additional info'
                type='text'
                placeholder='add your own'
                value={formData.notes}
                name='notes'
                handleChange={handleChange}
                register={register}
                error={errors.notes}
                />
            <Button
            text={editEntry ? "Edit Note":"Noted"}
            buttonType="submit"
            />
        </form>

    )
}

export default NewEntryForm;