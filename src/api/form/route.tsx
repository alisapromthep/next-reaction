import { UserSchema } from "@/components/AuthComponents/types";
import { NextResponse } from "next/server";
//server-side validation

export async function POST(request: Request){
    //retrieve JSON data from request body
    const body = await request.json();
    //use zod to validate the received data against the UserSchema
    const result = UserSchema.safeParse(body);

    //check if validation is successful 
    if(result.success){
            return NextResponse.json({success: true});
    }

    //If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
            result.error?.issues?.map((issue)=> [issue.path[0], issue.message]) || []
    );

    //respond with a JSON object containing the validation errors 
    return NextResponse.json({error: serverErrors})
}
