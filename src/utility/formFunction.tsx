"use server"

import pb from "../../lib/pocketbase";
import {cookies} from 'next/headers';
//since I need to connect with database, 
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
        const userCookie = JSON.parse(requestCookie?.value);
        const {token, model } = userCookie; 
        

        const newEntry = {
                "user_id": model.id,
                "time_of_day": timeOfDay,
                "food": formData.get('foodOption')?.toString(),
                "symptom": symptomsList.join(","),
                "notes": formData.get('notes')?.toString()
        };

        console.log(newEntry)
        console.log(pb.authStore.token)


        try {
                const record = await pb.collection('entries').create(newEntry,{
                        headers: {
                                "token": token
                        }
                })
                console.log(record)

        } catch(err) {
                console.log(err)
        }
}