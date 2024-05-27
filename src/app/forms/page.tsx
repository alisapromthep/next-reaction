
import NewEntryForm from '@/components/Forms/NewEntryForm';
import NavBar from '@/components/NavBar/NavBar';


function formPage() {

    return (
        <>
        <NavBar/>
            <div className='bg-grey-light p-4 m-4 rounded-xl'>
                <NewEntryForm/>
            </div>
        </>
    )


}

export default formPage;