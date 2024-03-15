import {RiDeleteBin5Line} from 'react-icons/ri';
import { CldImage } from 'next-cloudinary'
import foodIcons from '@/components/Forms/foodIcons.json';

type propType = {
    [key: string]: string;
}

interface summaryPropType {
    foodKey: string;
    foodLog: propType[];
}

function SummaryDetail({foodKey, foodLog}:summaryPropType) {

    let foodIcon = foodIcons.filter((icon)=> icon.name === foodKey);

    const {name, img_file} = foodIcon[0];

    return (
        <article className='border border-white m-2 p-2'>
            <div className=''>
                <CldImage
                width={20}
                height={20}
                src={img_file}
                alt={name}
                />
            <p className='capitalize font-bold'>{name}</p>
            </div>
            <ul>
                {foodLog.map((entry)=>{
                    const timestamp = Date.parse(entry.date);
                    let inputDate = new Date(timestamp);
                    return (
                        <li 
                        className=''
                        >
                            <p className=''>
                            <span className='font-bold'>{inputDate.toLocaleDateString()}</span>: {entry.symptom}</p>
                            <p className={`${entry.notes ? '': 'hidden'}`}><span className='font-bold capitalize'>note</span> {entry.notes}
                            </p>
                            <button
                            onClick={()=>{}}
                            >
                                <RiDeleteBin5Line id='' className=''/>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </article>
    );
}

export default SummaryDetail;