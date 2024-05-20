import {RiEditBoxLine} from 'react-icons/ri';
import { editEntry } from '@/utility/formFunction';

const DeleteForm = ({postID}: {postID:string}) =>{

    return (
        <form action={editEntry}>
            <input type="hidden" name="postID" value={postID}/>
            <button type="submit">
            <RiEditBoxLine/>
            </button>
        </form>
    )

}

export default DeleteForm;