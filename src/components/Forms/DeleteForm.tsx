import {RiDeleteBin5Line} from 'react-icons/ri';
import { deleteEntry } from '@/utility/formFunction';

const DeleteForm = ({postID}: {postID:string}) =>{

    return (
        <form action={deleteEntry}>
            <input type="hidden" name="id" value={postID}/>
            <RiDeleteBin5Line/>
        </form>
    )

}

export default DeleteForm;