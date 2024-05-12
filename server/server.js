const express=require('express')
const cors=require('cors');
const port=8000;
const mongoose=require('mongoose');
const model =require("./models/data.js");
const nodemailer=require("nodemailer");
require('dotenv').config(); 
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'https://fsotp.vercel.app',
    credentials:true
}))
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('mongodb connected');
})
.catch((err)=>{
    console.log(err);
})
app.get('/',(req,res)=>{
    res.send("hi");
});
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    }
});
transporter.verify((err,success)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Nodemailer connected");
    }
})
app.post('/registration',async(req,res)=>{
   const {username,email,password}=req.body
   try{
      const checkemail=await model.findOne({email});
      if(checkemail){
        return res.status(400).json({message:"Email already exists"})
      }
      const otp=Math.floor(1000+Math.random()*9000)
      const newuser=new model({
        username:username,
        email:email,
        password:password,
        otp:otp
      })
      const mailOptions={
        from:process.env.GMAIL_USER,
        to:email,
        subject:"OTP for registration",
        html:`
        <div style="background-color:#242424;color:white;padding:20px;border-radius:10px;text-align:center;">
        <p>Hi ${username}</p>
        <p>Your OTP for creating account is ${otp}</p></div>`
    };
    transporter.sendMail(mailOptions,async (err,succcess)=>{
        if(err){
            console.log(err)
            return res.status(500).json({ error: "Failed to send OTP email" });
        }
        try {
            await newuser.save();
            return res.status(200).json({ message: "Verification successful" });
        } catch (saveError) {
            console.log(saveError);
            return res.status(500).json({ error: "Failed to save user" });
        }
    });
   }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
    })
    app.post("/Verification",async (req,res)=>{
        try{
           const userotp=parseInt(req.body.otp);
           const checkotp=await model.findOne({otp:userotp})
           if(checkotp && checkotp.otp!==undefined && checkotp.otp===userotp){
            return res.status(200).json({message:"Otp verified"})
           }
           else{
            return res.status(400).json({error:"Incorrect otp"})
           }
        }
        catch(err){
            console.log(err)
            return res.status(500).json({error:"Internal server error"})
        }
    })
app.listen(port,()=>{
    console.log("port connected")
})
