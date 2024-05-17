
//convert date and time string from pocketbase 

//receive the time_of_day from database
//str = "time date"
//return date and time separately 
//make date into dd/mm/yy formate

export const convertDate = (str: string) => {
    return str.split(" ")[1]
}

export const convertTime = (str: string) =>{
    return str.split(" ")[0]
}

export const getTodaysDate = () => {
    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}`:`${today.getDate()}`
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}`:`${today.getMonth()+1}`
    const yyyy = today.getFullYear();

    const todayDate = `${yyyy}-${mm}-${dd}`;

    return todayDate;

}

export const getTimeNow = ()=>{

    const today = new Date();
    const hours = today.getHours() < 10 ? `0${today.getHours()}`:today.getHours();
    const minutes = today.getMinutes()<10 ? `0${today.getMinutes()}`:today.getMinutes();
    const timeNow = `${hours}:${minutes}`

    return timeNow;
    
}

