import express from 'express'
import { apply, login, logout, signin } from '../controllers/auth.controller.js';
import AppliedOppurtunity from '../models/applied.model.js';
import protectRoute from '../middleware/protectRoute.js';
import User from '../models/user.model.js';

const router=express.Router();

router.post("/signin",signin)
router.post("/login",login)
router.post("/logout",logout)
router.post("/apply",protectRoute,apply)
router.get("/applied-oppurtunities",protectRoute,async (req,res)=>{
    try {
       const appliedOppurtunities = await AppliedOppurtunity.find({userId:req.user.email})
       res.json(appliedOppurtunities)
    } catch (error) {
       res.status(500).send("Internal server error")
    }
   })
router.post("/profileupdate",async(req,res)=>{
      const {username,email,password,dob,address} = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      user.username = username;
      user.dob = dob;
      user.address = address;
      await user.save();
      return res.json({ status: true, message: "User updated successfully" });
  })
router.get("/profile", protectRoute, async (req, res) => {
   try {
     const user = await User.findOne({ email: req.user.email });
     
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }

     res.json({ status: true, message: "Profile fetched successfully", user});
   } catch (error) {
     res.status(500).json({ error: "Internal server error" });
   }
 });
export default router;