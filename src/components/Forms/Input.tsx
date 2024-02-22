import React, {ChangeEvent} from 'react'

interface InputProps {
    labelName: string;
    label: string;
    inputName: string;
    placeholder: string;
    inputType: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({labelName, label, inputName, placeholder, inputType, onChange}: InputProps) => {

    return(
        <label className='font-bold flex flex-col py-2 capitalize text-lg'
        htmlFor={labelName}
        >
            {label}
            <input
            name={inputName}
            type={inputType}
            className='border-b border-green placeholder:font-light py-2'
            placeholder={placeholder}
            onChange={onChange}
            />
        </label>
    )
}

export default Input;
