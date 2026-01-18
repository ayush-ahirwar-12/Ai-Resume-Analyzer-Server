import app from "./src/app";
import config from "./src/config/environment"
import { connecDb } from "./src/config/database";


const {PORT} = config;
const startServer = async()=>{
    await connecDb();
    

}