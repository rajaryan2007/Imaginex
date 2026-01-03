import {handlers} from "@/auth";
export const GET = (req, res) => {
    console.log("NextAuth GET request", req.url);
    return handlers.GET(req, res);
}
export const POST = (req, res) => {
    console.log("NextAuth POST request", req.url);
    return handlers.POST(req, res);
}


