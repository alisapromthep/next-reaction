import React, {ChangeEvent} from 'react';

interface InputProps {
    labelName: string;
    label: string;
    inputName: string;
    placeholder: string;
    inputType: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    additionClassName?: string;
}

const Input = ({labelName, label, inputName, placeholder, inputType, onChange, additionClassName}: InputProps) => {

    return(
        <label className='font-bold flex flex-col py-2 capitalize text-lg'
        htmlFor={labelName}
        >
            {label}
            <input
            name={inputName}
            type={inputType}
            className={`bg-green-light border-b border-green placeholder:font-light py-2 ${additionClassName}`}
            placeholder={placeholder}
            onChange={onChange}
            />
        </label>
    )
}

export default Input;
