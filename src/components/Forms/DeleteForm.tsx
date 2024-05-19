import {RiDeleteBin5Line} from 'react-icons/ri';
import { deleteEntry } from '@/utility/formFunction';

const DeleteForm = ({postID}: {postID:string}) =>{

    return (
        <form action={deleteEntry}>
            <input type="hidden" name="postID" value={postID}/>
            <button type="submit">
            <RiDeleteBin5Line/>
            </button>
        </form>
    )

}

export default DeleteForm;