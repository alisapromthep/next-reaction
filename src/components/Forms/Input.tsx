import React from 'react'

interface InputProps {
    labelName: string;
    label: string;
    inputName: string;
    placeholder: string;
    inputType: string;
    //onChange: React.ChangeEvent<HTMLInputElement>;
}

const Input = ({labelName, label, inputName, placeholder, inputType}: InputProps) => {

    return(
        <label className='font-bold flex flex-col'
        htmlFor={labelName}
        >
            {label}
            <input
            name={inputName}
            type={inputType}
            className='border-b border-green placeholder:font-light'
            placeholder={placeholder}
            />
        </label>
    )
}

export default Input;
