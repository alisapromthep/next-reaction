import { CldImage } from 'next-cloudinary'
import DeleteForm from '@/components/Forms/DeleteForm';
import {RiEditBoxLine} from 'react-icons/ri';
import { useRouter } from 'next/navigation';

type propType = {
    [key: string]: string;
}

interface summaryPropType {
    key: number;
    foodKey: string;
    foodLog: propType[];
    foodIcon: propType;
    setEditEntry: React.Dispatch<React.SetStateAction<boolean>>;
    setPostID: React.Dispatch<React.SetStateAction<string>>
}

function SummaryDetail({key, foodKey, foodLog, foodIcon, setEditEntry,setPostID}:summaryPropType) {

    const router = useRouter();

    const handleClickEdit = (postID: string)=>{
        setEditEntry(true);
        setPostID(postID)
        console.log('click edit')

        return router.push('/forms')
    }

    return (
        <article className='border border-white m-2 p-2'
        key={key}
        >
            <div className=''>
                <CldImage
                width={20}
                height={20}
                src={foodIcon.img_file}
                alt={foodIcon.name}
                />
            <p className='capitalize font-bold'>{foodIcon.name}</p>
            </div>
            <ul>
                {foodLog.map((entry)=>{
                    return (
                        <li 
                        className=''
                        key={entry.postID}
                        >
                            <p className=''>
                            <span className='font-bold'>{entry.date}</span>: {entry.symptom} , {entry.custom_symptom}</p>
                            <p className={`${entry.notes ? '': 'hidden'}`}><span className='font-bold capitalize'>note</span> {entry.notes}
                            </p>
                            <button onClick={()=> 
                            handleClickEdit(entry.post_id)
                            }>
                            <RiEditBoxLine/>
                            </button>
                            <DeleteForm postID={entry.post_id}/>
                        </li>
                    )
                })}
            </ul>
        </article>
    );
}

export default SummaryDetail;