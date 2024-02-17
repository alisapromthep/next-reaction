"use client"

import React from 'react';
import Input from '../../components/Forms/Input'; 



const RegisterPage = ()=>{

    return(
        <div>
            <h1>Register</h1>
            <form>
                <Input
                labelName='username'
                label='username'
                inputName='username'
                placeholder='username'
                inputType='text'
                />
                <Input
                labelName='password'
                label='password'
                inputName='password'
                placeholder='password'
                inputType='text'
                />
                <Input
                labelName='email'
                label='email'
                inputName='email'
                placeholder='email'
                inputType='email'
                />
            </form>
        </div>
    )
}

export default RegisterPage;