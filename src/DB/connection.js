import mongoose from "mongoose"
import {appConfig} from "../../config/config.service.js"
export const connectDB = async ()=>{
    try {
        mongoose.connect(appConfig.dbHost)
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Failed to connect to DB", error.message)
    }
}