

const NewEntryForm = ()=>{

    return (
        <form
        className=""
        >
            <label className="capitalize">
                date
                <input
                required
                className=""
                type='date'
                value=""
                name='date'
                />
            </label>
            <label className="capitalize">
                What time did the reaction happen?
                <input
                required
                className=""
                type='time'
                value=""
                name='time'
                />
            </label>

            <fieldset>
                <legend>What was the reaction?</legend>
            </fieldset>
        </form>

    )
}

export default NewEntryForm;