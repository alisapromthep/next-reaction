import {FieldError, UseFormRegister} from "react-hook-form";
import {z, ZodType} from "zod";

export type FormData = {
    username: string;
    password: string;
    confirmPassword: string;
}

export type FormFieldProps = {
    labelName: string;
    label: string;
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?:boolean;
}

export type ValidFieldNames =  | "username" | "password" | "confirmPassword";

export const UserSchema: ZodType<FormData> = z
.object({
    username: z.string(),
    password: z
    .string()
    .min(8,{message: "Password is too short"}),
    confirmPassword: z.string(),
})
.refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword",]
})