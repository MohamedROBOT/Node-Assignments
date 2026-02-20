import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_HOST);

export const connectDB = () => {
    client.connect().then(()=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        console.log("Failed to connect DB",err)
    })
}



export const db = client.db("mongosh_as7");