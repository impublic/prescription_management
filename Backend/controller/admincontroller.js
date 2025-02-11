import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
// import { json } from 'express'
import doctorsModel from '../model/doctorsModel.js'
import jwt from 'jsonwebtoken'
import appointmentModal from '../model/appointmentModal.js'
import Usermodels from '../model/Usermodels.js'
// api for adding doctor
const addDoctor = async(req,res)=>{
    try{
       const{name,email,password,speciality,degree,experience,about,fees,address}=req.body;
       const imageFile = req.file;
       console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile)

    //    checking for all data to add doctors
    if(!name ||!email||!password||!speciality||!degree||!experience||!about || !fees|| !address){
        return res.json({success:false,message:"missing details "})
    }
    // validator email format
if(!validator.isEmail(email)){
    return res.json({success:false, message:"please Enter valid Email"})
}

if(password.length < 8){
    return res.json({success:false, message:"please Enter a strong password"})
}
// hashing doctor password
const salt =  await bcrypt.genSalt(10)
const hashpassword = await bcrypt.hash(password,salt)

// upload image to clodinary
// const cloudinary = await cloudinary.uploader.upload(imageFile.path , {resource_type:"image"})
// const imageUrl = imageUpload.secure_url
const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
const imageUrl = imageUpload.secure_url;
const doctorData = {
    name,
    email,
    password:hashpassword,
    speciality,
    image:imageUrl,
    degree,
    experience,
    about,
    fees,
    address:JSON.parse(address),
    date:Date.now(),
}
const newDoctor = new doctorsModel(doctorData)
await newDoctor.save()
res.json({success:true,message:"Doctor added"})
    }catch(error){
console.log(error)
res.json({success:false,message:error.message})
    }

}
// API for login admin
const loginAdmin = async (req,res) =>{
    const {email,password}=req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
const token = jwt.sign(email+password,process.env.JWT_SECRET)
res.json({success:true,token})
    }else{
        res.json({success:false,message:'Invalid Credential'})
    }
    try{

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get all doctors list for admin panel
const alldoctors = async(req,res)=>{
    console.log('Fetching all doctors')
    try{
const doctors = await doctorsModel.find({}).select('-password')
res.json({success:true,doctors})
console.log("Doctors found", doctors);

    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api to get all appointment list
const appointmentsadmin = async (req,res)=>{
    try {
const appointments = await appointmentModal.find({})
console.log('Appointments fetched:', appointments); 
res.json({success:true,appointments})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
// api for cancel appointment for admin panel
const appointmentCancel= async(req,res) => {
    try {
    
    const {appointmentId} = req.body
    
    const appointmentData = await appointmentModal.findById(appointmentId)
    
    
    await appointmentModal.findByIdAndUpdate(appointmentId,{cancelled:true})
    
    // Releasing doctor slot 
    const {docId,slotDate,slotTime} = appointmentData
    const doctorData = await doctorsModel.findById(docId)
     let slots_booked = doctorData.slots_booked
    slots_booked[slotDate]= slots_booked[slotDate].filter(e=> e!==slotTime)
    await doctorsModel.findByIdAndUpdate(docId,{slots_booked})
     res.json({ success: true, message: "Appointment cancelled successfully" });
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
       }

//     //    api to get dashboard data for admin panel
     const adminDashboard=async(req,res)=>{
 try{
 const doctors =  await doctorsModel.find({})
 const users = await Usermodels.find({})
 const appointments = await appointmentModal.find({})
 const dashData={
     doctors:doctors.length,
     appointments:appointments.length,
     patients:users.length,
     latestAppointments:appointments.reverse().slice(0,5)
 }
 res.json({success:true,dashData})
 }catch(error){
     console.log(error)
         res.json({success:false,message:error.message})
 }
     }
export {addDoctor,loginAdmin,alldoctors,appointmentsadmin,appointmentCancel,adminDashboard}