"use client"

import { CldImage } from "next-cloudinary";
import symptomIcons from "./symptomsIcons.json";

const NewEntryForm = ()=>{

    console.log(symptomIcons)

    return (
        <form
        className=""
        >
            <label className="capitalize">
                date
                <input
                required
                className=""
                type='date'
                value=""
                name='date'
                />
            </label>
            <label className="capitalize">
                What time did the reaction happen?
                <input
                required
                className=""
                type='time'
                value=""
                name='time'
                />
            </label>

            <fieldset>
                <legend>What was the reaction?</legend>
                {
                    symptomIcons.map((symptom,i)=>{
                        return (
                            <label
                            key={i}
                            className="flex flex-col items-center"
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
        </form>

    )
}

export default NewEntryForm;