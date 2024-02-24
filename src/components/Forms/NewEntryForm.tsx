"use client"

import { CldImage } from "next-cloudinary";
import { useIconContext } from "@/context/iconContext";

const NewEntryForm = ()=>{

    const {symptoms, result} = useIconContext();

    return (
        <form
        className=""
        >
            <div>
                <p>
                    {result}
                </p>
            </div>
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
                {/* <CldImage
                width={20}
                height={20}
                src=""
                alt="icon"
                /> */}
            </fieldset>
        </form>

    )
}

export default NewEntryForm;