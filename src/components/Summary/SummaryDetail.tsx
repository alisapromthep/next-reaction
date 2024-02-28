import {RiDeleteBin5Line} from 'react-icons/ri';
import { CldImage } from 'next-cloudinary';

type foodIconType = {
    name: string;
    img_file: string;
}

type foodLogType = {
    date: string;
    symptom: string;
    notes: string;
}

interface summaryPropType {
    foodKey: string;
    foodLog: foodLogType[];
    foodIcon: foodIconType;
}

function SummaryDetail({foodKey, foodLog, foodIcon}:summaryPropType) {

    return (
        <article className='summary'>
            <div className='summary__img-container'>
                <CldImage
                width={20}
                height={20}
                src={foodIcon.img_file}
                alt={foodIcon.name}
                />
            <p className='summary__img-name'>{foodIcon.name}</p>
            </div>
            <ul className='summary__list'>
                {foodLog.map((entry)=>{
                    const timestamp = Date.parse(entry.date);
                    let inputDate = new Date(timestamp);
                    return (
                        <li 
                        className='summary__detail'
                        >
                            <p className='summary__text'>
                            <span className='summary__detail--bold'>{inputDate.toLocaleDateString()}</span>: {entry.symptom}</p>
                            <p className={`${entry.notes ? '': 'summary__detail--noinfo'}`}><span className='summary__detail--bold'>Note</span> {entry.notes}
                            </p>
                            <button className='summary__delete'
                            onClick={()=>{}}
                            >
                                <RiDeleteBin5Line id='' className='summary__delete-img'/>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </article>
    );
}

export default SummaryDetail;