import { CldImage } from "next-cloudinary";
import foodIcons from "@/components/Forms/foodIcons.json";

type foodType = {
    food: string;
}

function CalendarEvent({food}: foodType){

    const foodInfo = foodIcons.find((icon)=> icon.name === food)

    return(
        <div>
            <CldImage
            width={20}
            height={20}
            src={foodInfo?.img_file || "none"}
            alt={foodInfo?.name || "none"}
            />
        </div>
    )

}

export default CalendarEvent;