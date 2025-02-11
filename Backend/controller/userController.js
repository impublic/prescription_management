import validator from 'validator'
import bcrypt from 'bcrypt'
import Usermodels from '../model/Usermodels.js';
import jwt from 'jsonwebtoken'
// import { json } from 'express';
import {v2 as cloudinary} from 'cloudinary'
import doctorsModel from '../model/doctorsModel.js';
import appointmentModal from '../model/appointmentModal.js';
import razorpay from 'razorpay'
// Add to register user

const registerUser= async (req,res) => {
    try {
const{name,email,password}=req.body
if(!name || !email || !password) {
     return res.json({success:false,message:"missing details"})
}
// validating email format
if(!validator.isEmail(email)){
    return res.json({success:false,message:"Enter a Correct Email"})
}
// validating strong password
if(password.length < 8) {
    return res.json({success:false,message:"Enter a Strong Password"})
}

// hashing user password
const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password,salt);

const userData = {
    name,
    email,
    password:hashedpassword
}
const newuser = new  Usermodels(userData)
const user = await newuser.save()

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
res.json({success:true,token})

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message });
    }

}
// Api to add login user
const loginUser = async(req,res) =>{
    try{
const{email,password}=req.body;
const user = await  Usermodels.findOne({email})
if(!user){
   return  res.json({success:false,message:'user does not exist'})
}
const ismatch =  await bcrypt.compare(password,user.password)
if(ismatch){
const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
res.json({success:true,token})
}else{
    res.json({success:false,message:'invalid credentials'})
}
    }catch(error)
    {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to get user profile data 
const getProfile = async (req,res) =>{
try{
const {userId } = req.body
const userData = await Usermodels.findById(userId).select('-password')
res.json({success:true,userData})
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to update user profile
const  updateprofile = async(req,res) => {
    try{
const {userId,name,phone,address,dob,gender}=req.body;
const imageFile = req.file;

if(!name || !phone || !dob || !gender){
    return res.json({success:false,message:"Data missing"})
}
await Usermodels.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
// upload image to cloudinary
if (imageFile) {
    
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
    const imageUrl = imageUpload.secure_url;

      await Usermodels.findByIdAndUpdate(userId, { image: imageUrl });
}
res.json({success:true,message:"profile updated"})
    }catch(error){
        res.json({ success: false, message: error.message });
    }
}

// Api to Book  appointment
const bookAppointment =async(req,res) =>{
try {
const {userId,docId,slotDate,slotTime}= req.body;
const docData = await doctorsModel.findById(docId).select('-password')
if(!docData.available){
     return res.json({success:false,message:'doctor not available'})
}
let  slots_booked = docData.slots_booked

// check for slot availibility 
if(slots_booked[slotDate]){
    // if slots is already there
    if(slots_booked[slotDate].includes(slotTime)){
       return res.json({success:false,message:'slot Not available'})
    }else {
        slots_booked[slotDate].push(slotTime)
    }
}else {
    slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
    }
    const userData = await Usermodels.findById(userId).select('-password')
    delete docData.slots_booked
    const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount:docData.fees,
        slotTime,
        slotDate,
        date:Date.now(),
    };
    const newAppointment = new appointmentModal(appointmentData);
    await newAppointment.save();

    // save new slots data  in docData
    await doctorsModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:'Appointment Booked'})
}catch(error){
    console.log(error)
    res.json({ success: false, message: error.message });
}
}

// api to get user appointment  for frontend my-appointment page
const listAppointment = async(req,res)=>{
    try {
const {userId}=req.body;
const appointments = await appointmentModal.find({userId})
res.json({success:true,appointments})

    }catch(error){
        console.log(error)
    res.json({ success: false, message: error.message });
}
    }

    // Api to cancel appointment
   const cancelAppointment= async(req,res) => {
try {

const {userId,appointmentId} = req.body

const appointmentData = await appointmentModal.findById(appointmentId)

//  appointment user  verify

if(appointmentData.userId !== userId){
    return res.json({success:false,message:"unauthorized action"})
}
await appointmentModal.findByIdAndUpdate(appointmentId,{cancelled:true})

// Releasing doctor slot 
const {docId,slotDate,slotTime} = appointmentData
const doctorData = await doctorsModel.findById(docId)
slots_booked = doctorData.slots_booked
slots_booked[slotDate]= slots_booked[slotDate].filter(e=> e!==slotTime)
await doctorsModel.findByIdAndDelete(docId,{slots_booked})
 res.json({ success: true, message: "Appointment cancelled successfully" });
}catch(error){

}
   }
   const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,      
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

    // api to pay payment of appointment using razorpay
 const paymentrazorpay= async(req,res)=>{
     try{
 const { appointmentId }= req.body
 const  appointmentData = await appointmentModal.findById(appointmentId)
 if(!appointmentData || appointmentData.cancelled){
      return res.json({success:false,message:"Appointment cancelled or not found"})
 }
//  creating options for razorpay payment
 const options = {
     amount:appointmentData.amount *100,
     currency:process.env.CURRENCY,
     receipt:appointmentId,
 }
//   creation of an order
const order = await razorPayInstance.orders.create(options);
  res.json({ success: true, order });
     } catch (error){
        console.log(error)
        res.json({ success: false, message: error.message });
     }
 }
// API to verify payment of razorpay
const verifyRazorpay =async (req,res)=>{
try {
const {razorpay_order_id}=req.body
const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id)
console.log(orderInfo)
if(orderInfo.status ==='paid'){
    await appointmentModal.findByIdAndUpdate(orderInfo.receipt,{payment:true})
    res.json({success:true,message:"payment successful Done"})
}else{
    res.json({success:true,message:"payment Failed"})
}

}catch(error){
    console.log(error)
        res.json({ success: false, message: error.message });
}
}
export{registerUser,loginUser,getProfile,updateprofile,bookAppointment,listAppointment,cancelAppointment,paymentrazorpay,verifyRazorpay}