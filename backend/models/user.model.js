import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type:String,
        default:""
    },
    dob:{
        type:Date,
        default:""
    }
    
});
const User = mongoose.model("User",userSchema)
export default User;