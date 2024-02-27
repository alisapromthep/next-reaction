import NewEntryForm from '../../../components/Forms/NewEntryForm';
import CalendarComponent from '../../../components/Calendar/CalendarComponent';

function profilePage() {

    return (
        <div>
            <h1>Welcome Username</h1>
            <CalendarComponent/>
            <NewEntryForm/>
        </div>
    )
}

export default profilePage;