"use client"
import Input from '../../components/Forms/Input'; 
import {useAuthContext} from '../../context/authContext';
import Button from '../../components/Buttons/Button';
import EyeButton from '../Buttons/EyeButton';
import { useRouter } from 'next/navigation';
import {useForm} from "react-hook-form";
import {FormData} from "@/components/FormField/types";
import FormField from '../FormField/FormField';
import {zodResolver} from "@hookform/resolvers/zod";
import { revalidatePath } from 'next/cache';
import {useState} from 'react';

const Login:React.FC= ()=>{

    const router = useRouter();

    const { signIn,showPassword} = useAuthContext();
    const {register, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful}, setError} = useForm<FormData>();
    const [ formError, setFormError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        try {
            await signIn(data.username,data.password)
            
        } catch(err){
            setFormError("Error logging");
            revalidatePath('/')
        }
    }


    return(
        <div className="md:w-3/5 font-NunitoSans flex flex-col bg-green-light">
            <h2 className='text-xl font-bold text-green-dark'>Login</h2>
            {!isSubmitSuccessful && formError && (
                <span className='text-red-600'>{formError}</span>
            )
            }
            <form onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center'
            >
                <FormField
                labelName='username'
                label='username'
                type="text"
                placeholder='username'
                name="username"
                register={register}
                error={errors.username}
                />
                <div className='relative'>
                    <FormField
                    labelName='password'
                    label='password'
                    type={showPassword ? 'text':'password'}
                    placeholder='password'
                    name="password"
                    register={register}
                    error={errors.password}
                    />
                    <EyeButton/>
                </div>
                <Button text="Login" buttonType='submit'/>
            </form>
        </div>
    )
}

export default Login;