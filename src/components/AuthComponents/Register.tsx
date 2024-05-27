"use"
import Input from '@/components/Forms/Input'; 
import Button from '@/components/Buttons/Button';
import {useAuthContext} from '../../context/authContext';
import EyeButton from '../Buttons/EyeButton';
import {useForm} from 'react-hook-form';
import {FormData, UserSchema} from "@/components/AuthComponents/types";
import FormField from '../FormField/FormField';
import {zodResolver} from "@hookform/resolvers/zod";
import { revalidatePath } from 'next/cache';
import {useState} from 'react';

const Register: React.FC = ()=>{
    const {registerNewUser,showPassword} = useAuthContext();

    const [ formError, setFormError] = useState<string | null>(null);

    const {register, handleSubmit,formState:{errors, isSubmitting, isSubmitSuccessful}, setError} = useForm<FormData>({
        resolver: zodResolver(UserSchema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            await registerNewUser(data.username,data.password,data.passwordConfirm)
            
        } catch(err){
            setFormError("Error registering");
            revalidatePath('/')
        }
    }

    return(
        <div className='md:w-3/5 font-NunitoSans flex flex-col bg-green-light'>
            <h2 className="text-xl font-bold text-green-dark">Register</h2>
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
                <div>
                    <p className='text-sm'>*Password must be at least 8 characters</p>
                </div>
                <div className='relative'>
                <FormField
                    labelName='passwordConfirm'
                    label='Confirm password'
                    type={showPassword ? 'text':'password'}
                    placeholder='confirm password'
                    name="passwordConfirm"
                    register={register}
                    error={errors.passwordConfirm}
                    />
                    <EyeButton/>
                </div>
                <Button text="Submit" buttonType='submit'/>
            </form>
        </div>
    )
}

export default Register;