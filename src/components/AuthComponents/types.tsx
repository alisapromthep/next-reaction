import {FieldError, UseFormRegister} from "react-hook-form";
import {z, ZodType} from "zod";

export type FormData = {
    username: string;
    password: string;
    passwordConfirm: string;
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

export type ValidFieldNames =  | "username" | "password" | "passwordConfirm";

export const UserSchema: ZodType<FormData> = z
.object({
    username: z.string(),
    password: z
    .string()
    .min(8,{message: "Password is too short"}),
    passwordConfirm: z.string(),
})
.refine((data)=> data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["confirmPassword",]
})