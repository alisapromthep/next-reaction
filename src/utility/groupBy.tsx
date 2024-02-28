
type Log = {
    [key: string]: any;
}

type GroupedLogs = {
    [key:string]: Log[];
}


export const groupBy = <T extends Log>(key: keyof T, array:T[]): GroupedLogs => { return array.reduce((cache: GroupedLogs, logs: T)=>{
    const property = logs[key];
    if (property in cache) {
        return {...cache, [property]: cache[property].concat(logs)};
    } else {
        return {...cache, [property]:[logs]};
    }
}, {} as GroupedLogs);
}

