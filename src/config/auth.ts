import dotenv from "dotenv"
dotenv.config();

export default {
    Email: process.env.EMAIL as string ,
    Pass: process.env.PASS as string ,
    Service: process.env.SERVICE as string,
    Host: process.env.HOST as string,
}