import {createContext, useState, useContext, SetStateAction, FormEvent, useEffect} from 'react';
// import {v2 as cloudinary} from 'cloudinary';


// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
// })


interface IconContextType {
    result:any;
    symptoms: string[];
    foods: string[];
    setSymptoms: React.Dispatch<SetStateAction<string[]>>;
    setFoods: React.Dispatch<SetStateAction<string[]>>;
}

export const IconContext = createContext<IconContextType>({
    result:"",
    symptoms: [],
    foods: [],
    setSymptoms: ()=>{},
    setFoods:()=>{}
})


export const IconProvider: React.FC<{children: React.ReactNode}> = ({children}) =>{
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [result, setResult] = useState<any>();
    const [foods, setFoods] = useState<string[]>([]);

    async function getIcons(){
        try {
            const result = await fetch(`https://${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}.api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload`)
            console.log(result)

            setResult(result)

        } 
        catch (err) {
            console.log(err)
        }
        
    }
    useEffect(()=>{
        getIcons()
    },[])


    return (
        <IconContext.Provider value={{result,symptoms, setSymptoms, foods, setFoods}}>
            {children}
        </IconContext.Provider>
    )

}

export function useIconContext(){
    return useContext(IconContext)
}