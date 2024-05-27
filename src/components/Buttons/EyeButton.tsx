import {useAuthContext} from '../../context/authContext';
import { PiEyeBold,PiEyeClosedDuotone } from "react-icons/pi";

const EyeButton= ()=>{

    const {showPassword, setShowPassword} = useAuthContext();

    return (
        <button type='submit'
        className="absolute right-0 bottom-5"
        onClick={()=>setShowPassword(prev=> !prev)}
        >
            {
            showPassword? <PiEyeBold className="text-xl"/>:<PiEyeClosedDuotone className="text-xl"/>
            }

        </button>
    )
}

export default EyeButton;