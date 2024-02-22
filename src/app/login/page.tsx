"use client"

import React from 'react';
import Input from '../../components/Forms/Input'; 
import {useUserContext} from '../../context/userContext';
import Button from '../../components/Buttons/Button';


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
                <Button text="Submit" buttonType='submit'/>
            </form>
        </div>
    )
}

export default LoginPage;