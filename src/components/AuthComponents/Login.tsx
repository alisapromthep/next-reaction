import Input from '../../components/Forms/Input'; 
import {useAuthContext} from '../../context/authContext';
import Button from '../../components/Buttons/Button';
import EyeButton from '../Buttons/EyeButton';
import { useRouter } from 'next/navigation';

const Login:React.FC = ()=>{

    const router = useRouter();

    const {handleChange, handleLogin,showPassword} = useAuthContext();

    return(
        <div className="md:w-3/5 font-NunitoSans flex flex-col bg-green-light">
            <h2 className='text-xl font-bold text-green-dark'>Login</h2>
            <form onSubmit={handleLogin}
            className='flex flex-col justify-center'
            >
                <Input
                labelName='username'
                label='username'
                inputName='username'
                placeholder='username'
                inputType='text'
                onChange={handleChange}
                />
                <div  className='relative'>
                    <Input
                    labelName='password'
                    label='password'
                    inputName='password'
                    placeholder='password'
                    inputType={showPassword ? 'text':'password'}
                    onChange={handleChange}
                    />
                    <EyeButton/>
                </div>
                <Button text="Login" buttonType='submit'/>
            </form>
        </div>
    )
}

export default Login;