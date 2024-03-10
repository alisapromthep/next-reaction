"use client"

import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";
import foodIcons from "./foodIcons.json";
import Button from "../Buttons/Button";
import {convertDate, convertTime} from "../../utility/dateAndTime";

const NewEntryForm = ()=>{

    return (
        <form
        className="bg-gray"
        >
            <label className="capitalize flex flex-col">
                date
                <input
                required
                className=""
                type='date'
                value=""
                name='date'
                />
            </label>
            <label className="capitalize flex flex-col">
                What time did the reaction happen?
                <input
                required
                className=""
                type='time'
                value=""
                name='time'
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
                                />
                            </label>
                        )
                    })
                }
            </fieldset>
            <Button
            text="Noted"
            buttonType="submit"
            />
        </form>

    )
}

export default NewEntryForm;