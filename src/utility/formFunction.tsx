"use server"

import { revalidatePath } from "next/cache";
import pb from "../../lib/pocketbase";
import {cookies} from 'next/headers';

//use server action here to be able to do a post request 
//formData --> collects info for you
// revalidatePath --> make it once database is updated it rerender the component

export async function addNewEntry(formData: FormData){
        console.log('formData',formData)
        let symptomsList = formData.getAll('symptoms')
        console.log(symptomsList.join(","))
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
        
                } catch(err) {
                        console.log(err)
                }
        }
        

}