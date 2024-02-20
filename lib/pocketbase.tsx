import PocketBase from "pocketbase";

//this file create pb object to be used anywhere in the app

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

if(process.env.NODE_ENV === "development") pb.autoCancellation(false);

export default pb;

