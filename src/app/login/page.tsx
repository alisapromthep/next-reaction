"use client"

import React from 'react';
import Input from '../../components/Forms/Input'; 
import {useUserContext} from '../../context/userContext';


const LoginPage = ()=>{

    const {userInfo, handleChange, handleLogin} = useUserContext();

    return(
        <div>
            <form onSubmit={handleLogin}>
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
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;