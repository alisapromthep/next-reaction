import {FieldError, UseFormRegister} from "react-hook-form";
import {z, ZodType} from "zod";

export type FormData = {
    username: string;
    password: string;
    passwordConfirm: string;
    date: string;
    time: string;
    foodOption: string;
    symptoms: string[];
    customSymptom?: string;
    notes?: string;   
}

export type FormFieldProps = {
    labelName: string;
    label: string;
    type: string;
    placeholder?: string;
    value?: string | string[];
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?:boolean;
}

export type ValidFieldNames =  | "username" | "password" | "passwordConfirm" 
|"date" | "time" | "foodOption" | 
"symptoms" | "customSymptom" | "notes";

export const UserSchema: ZodType<FormData> = z
.object({
    username: z.string(),
    password: z
    .string()
    .min(8,{message: "Password is too short"}),
    passwordConfirm: z.string(),
    date:z.string(),
    time:z.string(),
    foodOption:z.string(),
    symptoms:z.string().array().nonempty(),
    customSymptom:z.string().optional(),
    notes:z.optional(z.string()),
})
.refine((data)=> data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["confirmPassword",]
})