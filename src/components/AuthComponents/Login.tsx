import Input from '../../components/Forms/Input'; 
import {useAuthContext} from '../../context/authContext';
import Button from '../../components/Buttons/Button';
import { useRouter } from 'next/navigation';

const Login = ()=>{

    const router = useRouter();

    const {currentUser, isLogin, handleChange, handleLogin} = useAuthContext();

    if(isLogin){
        router.push(`profile/${currentUser.username}`)
    }

    return(
        <div className="font-NunitoSans flex flex-col bg-green-light">
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
    )
}

export default Login;