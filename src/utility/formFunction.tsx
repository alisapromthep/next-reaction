"use server"

import pb from "../../lib/pocketbase";
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

        const newEntry = {
                "user_id": pb.authStore.model?.id,
                "time_of_day": timeOfDay,
                "food": formData.get('foodOptions')?.toString(),
                "symptom": symptomsList.join(","),
                "notes": formData.get('notes')?.toString()
        };



        const record = await pb.collection('entires').create(newEntry, {
                headers: {
                        'token': pb.authStore.token
                }
        })
        console.log(record)
}