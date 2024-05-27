"use server"


import pb from "../../lib/pocketbase";
import {cookies} from 'next/headers';
import { UserSchema } from "@/components/AuthComponents/types";
import {redirect} from "next/navigation";
import { revalidatePath } from "next/cache";


//use server action here to be able to do a post request 
//formData --> collects info for you
// revalidatePath --> make it once database is updated it rerender the component

// const getCookie = ()=>{
//         const cookieStore = cookies();
//         const requestCookie = cookieStore.get('pb_auth');
//         if(!requestCookie){
//                 return console.log("cookie 'pb_auth' not found")
//         } 
//         //parse cookie before returning

//         return 
// }





export async function addNewEntry(formData: FormData){

        //where to redirect to 
        let redirectPath = '/'

        console.log('formData',formData)
        let symptomsList = formData.getAll('symptoms')
        symptomsList.join(",")
        let time = formData.get('time')?.toString()
        let date = formData.get('date')?.toString()
        let timeOfDay = `${time} ${date}`

        const cookieStore = cookies();
        const requestCookie = cookieStore.get('pb_auth');
        if(!requestCookie){
                console.log("cookie 'pb_auth' not found")
        } else{

                const userCookie = JSON.parse(requestCookie.value);
                const {token, model } = userCookie; 

                const newEntry = {
                        "user_id": model.id,
                        "time_of_day": timeOfDay,
                        "timestamp":Date.parse(timeOfDay),
                        "food": formData.get('foodOption')?.toString(),
                        "symptom": symptomsList.join(","),
                        "notes": formData.get('notes')?.toString(),
                        "custom_symptom": formData.get('customSymptom')?.toString(),
                        // "custom_food": formData.get('customFood')?.toString(),
                };

                try {
                        const record = await pb.collection('entries').create(newEntry,{
                                headers: {
                                        "token": token
                                }
                        })
                        console.log(record)
                        revalidatePath('/profile/[username]', 'page')
                        redirectPath= `/profile/${model.username}`
                        return {message: 'Successfully added new entry log'}
        
                } catch(err) {
                        console.log(err)
                        return {message: 'error has occurred'}
                } finally{
                        redirect(redirectPath)
                }
        }
        

}

export async function deleteEntry(formData: FormData){

        console.log(formData)
        let postID = formData.get("postID")
        
        console.log(postID)

        const cookieStore = cookies();
        const requestCookie = cookieStore.get('pb_auth');

        if(!requestCookie){
                console.log("cookie 'pb_auth' not found")
        } else{

                const userCookie = JSON.parse(requestCookie.value);
                const {token} = userCookie; 

                if(typeof postID !== 'string'){
                        return;
                }

        try{
                const deleteRecord = await pb.collection('entries').delete(postID,{
                        headers: {
                                "token": token
                        }
                })

                console.log(deleteRecord)
                        revalidatePath('/profile/[username]', 'page')
                        return {message: 'Successfully added new entry log'}


        } 
        catch(err) {
                console.log(err)
                        return {message: 'error has occured'}
        }
}
}

export async function editEntryByID(formData: FormData){

        console.log(formData)
        let postID = formData.get("postID")
        let symptomsList = formData.getAll('symptoms')
        symptomsList.join(",")
        let time = formData.get('time')?.toString()
        let date = formData.get('date')?.toString()
        let timeOfDay = `${time} ${date}`
        console.log(postID)

        const cookieStore = cookies();
        const requestCookie = cookieStore.get('pb_auth');

        if(!requestCookie){
                console.log("cookie 'pb_auth' not found")
        } else{

                const userCookie = JSON.parse(requestCookie.value);
                const {token, model} = userCookie; 

                const updatedEntry = {
                        "user_id": model.id,
                        "time_of_day": timeOfDay,
                        "timestamp":Date.parse(timeOfDay),
                        "food": formData.get('foodOption')?.toString(),
                        "symptom": symptomsList.join(","),
                        "notes": formData.get('notes')?.toString()
                }

                if(typeof postID !== 'string'){
                        return;
                }

        try{
                const updateRecord = await pb.collection('entries').update(postID,updatedEntry, {
                        headers: {
                                "token": token
                        }
                })

                console.log(updateRecord)
                        revalidatePath('/profile/[username]', 'page')
                        return {message: 'Successfully added new entry log'}


        } 
        catch(err) {
                console.log(err)
                        return {message: 'error has occured'}
        }
}
}