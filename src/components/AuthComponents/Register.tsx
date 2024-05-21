import Input from '@/components/Forms/Input'; 
import Button from '@/components/Buttons/Button';
import {useAuthContext} from '../../context/authContext';
import EyeButton from '../Buttons/EyeButton';

const Register: React.FC = ()=>{
    const {handleChange, handleRegister,showPassword} = useAuthContext();

    return(
        <div className='md:w-3/5 font-NunitoSans flex flex-col bg-green-light'>
            <h2 className="text-xl font-bold text-green-dark">Register</h2>
            <form onSubmit={handleRegister}
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
                <div className='relative'>
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
                <div className='relative'>
                    <Input
                    labelName='passwordConfirm'
                    label='passwordConfirm'
                    inputName='passwordConfirm'
                    placeholder='passwordConfirm'
                    inputType={showPassword ? 'text':'password'}
                    onChange={handleChange}
                    />
                    <EyeButton/>
                </div>
                <Button text="Submit" buttonType='submit'/>
            </form>
        </div>
    )
}

export default Register;