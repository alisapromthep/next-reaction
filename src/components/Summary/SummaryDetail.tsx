import { CldImage } from 'next-cloudinary'
import foodIcons from '@/components/Forms/foodIcons.json';
import { deleteEntry } from '@/utility/formFunction';
import DeleteForm from '@/components/Forms/DeleteForm';
import {RiEditBoxLine} from 'react-icons/ri';


type propType = {
    [key: string]: string;
}

interface summaryPropType {
    foodKey: string;
    foodLog: propType[];
    foodIcon: propType;
    setEditEntry: React.Dispatch<React.SetStateAction<boolean>>;
    setPostID: React.Dispatch<React.SetStateAction<string>>
}

function SummaryDetail({foodKey, foodLog, foodIcon, setEditEntry,setPostID}:summaryPropType) {

    // let foodIcon = foodIcons.find((icon)=> icon.name === foodKey);

    // const {name, img_file} = foodIcon[0];

    const handleClickEdit = (postID: string)=>{
        setEditEntry(true);
        setPostID(postID)
    }

    return (
        <article className='border border-white m-2 p-2'>
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
                        >
                            <p className=''>
                            <span className='font-bold'>{entry.date}</span>: {entry.symptom}</p>
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