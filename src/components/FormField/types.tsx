import {FieldError, UseFormRegister} from "react-hook-form";

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
