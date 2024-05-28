import {FieldError, UseFormRegister} from "react-hook-form";
import {z, ZodType} from "zod";


export type FormData = {
    date: string;
    time: string;
    foodOption: string;
    symptoms: string[];
    customSymptom: string,
    notes: string;
};

export type FormFieldProps = {
    type: string;
    placeholder?: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?:boolean;
};

export type ValidFieldNames = | "date" | "time" | "foodOption" | 
"symptoms" | "customSymptom" | "notes";

