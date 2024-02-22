
type ButtonType = "button" |"submit"|"reset";

type ButtonProp ={
    text: string;
    buttonType: ButtonType;
}


const Button = ({text, buttonType}: ButtonProp)=>{

    return (
        <button type={buttonType}
        className="bg-orange text-white font-bold rounded-lg px-8 py-2"
        >
            {text}
        </button>
    )
}

export default Button;