import { CldImage } from "next-cloudinary";

function CalendarEvent(){

    return(
        <div>
            <CldImage
            width={20}
            height={20}
            src="foods/peach_vnxjwl"
            alt="peach"
            />
        </div>
    )

}

export default CalendarEvent;