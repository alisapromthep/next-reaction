import Input from '../../components/Forms/Input'; 
import {useAuthContext} from '../../context/authContext';
import Button from '../../components/Buttons/Button';
import EyeButton from '../Buttons/EyeButton';
import { useRouter } from 'next/navigation';
import {handleLogin} from '@/utility/authFunction';
import {useForm} from "react-hook-form";
import {FormData} from "@/components/FormField/types";
import FormField from '../FormField/FormField';

const Login:React.FC = ()=>{

    const router = useRouter();

    const {handleChange,showPassword} = useAuthContext();
    const {register, handleSubmit, formState:{errors}, setError} = useForm<FormData>();

    return(
        <div className="md:w-3/5 font-NunitoSans flex flex-col bg-green-light">
            <h2 className='text-xl font-bold text-green-dark'>Login</h2>
            <form action={handleLogin}
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