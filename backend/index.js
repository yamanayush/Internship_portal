import express from 'express'
import dotenv from 'dotenv'
import authroutes from './routes/auth.routes.js'
import connectToMongoDb from './db/connectToMongoDb.js'
import dataroutes from './routes/data.routes.js'
import cookieParser from 'cookie-parser'
import path from 'path'

const app=express()
dotenv.config()
const __dirname = path.resolve();

const PORT=process.env.PORT;
app.use(express.json())
app.use(cookieParser())


// app.use("/",(req,res)=>{
//     res.send("Yo")
// })
app.use("/api",authroutes);
app.use("/api",dataroutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});

app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`server started on ${PORT}`);
})
