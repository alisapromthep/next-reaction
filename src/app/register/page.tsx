"use client"

import React, {FormEvent} from 'react';
import Input from '../../components/Forms/Input'; 
import {useUserContext} from '../../context/userContext';


const RegisterPage: React.FC = ()=>{

    const {userInfo, handleChange} = useUserContext();

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void =>{
        event.preventDefault()

        console.log(userInfo)

    }


    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                labelName='username'
                label='username'
                inputName='username'
                placeholder='username'
                inputType='text'
                onChange={handleChange}
                />
                <Input
                labelName='password'
                label='password'
                inputName='password'
                placeholder='password'
                inputType='text'
                onChange={handleChange}
                />
                <Input
                labelName='email'
                label='email'
                inputName='email'
                placeholder='email'
                inputType='email'
                onChange={handleChange}
                />
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default RegisterPage;