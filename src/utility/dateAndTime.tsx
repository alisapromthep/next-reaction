
//convert date and time string from pocketbase 
export const convertDate = (str) =>{
    return str.split(" ")[0]

}

export const convertTime = (str) =>{
    return str.split(" ")[1]
}