"use"
import Input from '@/components/Forms/Input'; 
import Button from '@/components/Buttons/Button';
import {useAuthContext} from '../../context/authContext';
import EyeButton from '../Buttons/EyeButton';
import {useForm} from "react-hook-form";
import {FormData} from "@/components/FormField/types";
import { handleRegister } from '@/utility/authFunction';
import FormField from '../FormField/FormField';
import {redirect} from 'next/navigation';

const Register: React.FC = ()=>{
    const {handleRegister, currentUser, userInfo, handleChange,showPassword} = useAuthContext();

    const {register, handleSubmit,formState:{errors}, setError} = useForm<FormData>();

    return(
        <div className='md:w-3/5 font-NunitoSans flex flex-col bg-green-light'>
            <h2 className="text-xl font-bold text-green-dark">Register</h2>
            <form onSubmit={handleRegister}
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
                    labelName='confirmPassword'
                    label='confirmPassword'
                    type={showPassword ? 'text':'password'}
                    placeholder='confirmPassword'
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                    />
                    <EyeButton/>
                </div>
                <Button text="Submit" buttonType='submit'/>
            </form>
        </div>
    )
}

export default Register;