"use server"

import pb from "../../lib/pocketbase";
//since I need to connect with database, 
//use server action here to be able to do a post request 
//formData --> collects info for you
// revalidatePath --> make it once database is updated it rerender the component

export async function addNewEntry(selected: string[], formData: FormData){
        console.log('formData',formData)
        console.log('selected',selected)
        //await pb.collection('entires').create(newEntry)
    
}