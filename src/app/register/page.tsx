"use client"

import React, {FormEvent} from 'react';
import Input from '../../components/Forms/Input'; 
import Button from '../../components/Buttons/Button';
import {useUserContext} from '../../context/userContext';
import Image from 'next/image';
import boyImg from '../../../public/images/watermelonboy.png';


const RegisterPage: React.FC = ()=>{

    const {userInfo, handleChange, handleRegister} = useUserContext();

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void =>{
        event.preventDefault()

        console.log(userInfo)

    }


    return(
        <div className='font-NunitoSans flex flex-col bg-green-light'>
            <div className="self-end pr-16">
                <Image
                src={boyImg}
                width={250}
                height={250}
                alt="illustration of a guy holding a wage of watermelon"
                />
            </div>
            <div className='rounded-t-3xl bg-white px-8'>
                <h1 className="text-4xl text-green-dark py-8">Register</h1>
                <form onSubmit={handleRegister}>
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
                    labelName='passwordConfirm'
                    label='passwordConfirm'
                    inputName='passwordConfirm'
                    placeholder='passwordConfirm'
                    inputType='text'
                    onChange={handleChange}
                    />
                    <Button text="Submit" buttonType='submit'/>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;