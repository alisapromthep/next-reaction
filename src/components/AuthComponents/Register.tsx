import Input from '@/components/Forms/Input'; 
import Button from '@/components/Buttons/Button';
import {useAuthContext} from '../../context/authContext';

const Register: React.FC = ()=>{
    const {isLogin, currentUser, handleChange, handleRegister} = useAuthContext();

    return(
        <div className='font-NunitoSans flex flex-col bg-green-light'>
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
    )
}

export default Register;