"use client"

import React from 'react';
import Input from '../../components/Forms/Input'; 
import Image from 'next/image';
import boyImg from '../../../public/images/watermelonboy.png';
import {useUserContext} from '../../context/userContext';
import Button from '../../components/Buttons/Button';


const LoginPage = ()=>{

    const {userInfo, handleChange, handleLogin} = useUserContext();

    return(
        <div className="font-NunitoSans flex flex-col bg-green-light">
            <div className="self-end pr-16">
                <Image
                src={boyImg}
                width={250}
                height={250}
                alt="illustration of a guy holding a wage of watermelon"
                />
            </div>
            <div className='rounded-t-3xl bg-white px-8'>
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
                    <Button text="Login" buttonType='submit'/>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;