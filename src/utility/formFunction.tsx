"use server"

import { revalidatePath } from "next/cache";
import pb from "../../lib/pocketbase";
import {cookies} from 'next/headers';

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
                        "notes": formData.get('notes')?.toString()
                };

                try {
                        const record = await pb.collection('entries').create(newEntry,{
                                headers: {
                                        "token": token
                                }
                        })
                        console.log(record)
                        revalidatePath('/profile/[username]', 'page')
                        return {message: 'Successfully added new entry log'}
        
                } catch(err) {
                        console.log(err)
                        return {message: 'error has occured'}
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
                const {token, model } = userCookie; 

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