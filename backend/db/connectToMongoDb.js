import express from 'express'
import mongoose from 'mongoose'

const connectToMongoDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log("Error connecting to MongoDb ",error.message);
    }
}

export default connectToMongoDb