
import doctorsModel from '../model/doctorsModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModal from '../model/appointmentModal.js';
// change availability 
const changeavailability=async(req,res)=>{
try {
const {docId}=req.body
const docData = await doctorsModel.findById(docId)
await doctorsModel.findByIdAndUpdate(docId,{available: !docData.available })
res.json({success:true,message:'availablity changed'})
}catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
}
}

const doctorList = async (req,res) =>{
    try{
        const doctors = await doctorsModel.find({}).select(['-password', '-email'])
res.json({ success: true, doctors });
    } catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
};

// Api for login doctor
const loginDoctor= async(req,res)=>{
    try{
const {email,password} = req.body
const doctor = await doctorsModel.findOne({email})
if(!doctor){
     return res.json({success:false,message:"invalid credentail sorry"})
}
const isMatch = await  bcrypt.compare(password , doctor.password)
if(isMatch){
    const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
    res.json({success:true,token})
}else {
    res.json({success:false,message:'invalid credential '})
}
    } catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

// Api to get doctor appointment for specific doctor for doctor panel
const appointmentDoctor = async(req,res)=>{
    try{
    const {docId} = req.body
    const appointments=await appointmentModal.find({docId})
    res.json({success:true, appointments})
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to mark  appointment  completed for doctor panel
const appointmentcompleted= async(req,res)=>{
    try{
    const {docId,appointmentId}=req.body
    const appointmentData = await appointmentModal.findById(appointmentId)
    if(appointmentData && appointmentData.docId ===docId)
    {
        await appointmentModal.findByIdAndUpdate(appointmentId,{iscompleted:true})
        return res.json({success:true,message:'Appointment completed'})
    } else {
        return res.json({success:false,message:'mark Failed'})
    }

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to make appointment cancelled
const appointmentcancelled=async(req,res)=>{
    try {
    const {docId,appointmentId}=req.body
    const appointmentData = await appointmentModal.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId)
    {
        await appointmentModal.findByIdAndUpdate(appointmentId,{cancelled:true})
        return res.json({success:true,message:'Appointment Cancelled'})
    } else {
        return res.json({success:false,message:'Cancellation Failed'})
    }
    
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to get doctor dashboard for doctor panel
const  doctorDashboard=async(req,res)=>{
    try {
const{docId} = req.body
const appointments = await appointmentModal.find({docId})
let earnings=0
appointments.map((item)=>{
if(item.payment || item.iscompleted){
    earnings +=item.amount;
}
})
let patients = []
appointments.map((item)=>{
if(!patients.includes(item.userId)){
patients.push(item.userId)
}
})
const dashData = {
    earnings,
    appointments:appointments.length,
    patients:patients.length,
    latestAppointments:appointments.reverse().slice(0,5)
}
res.json({success:true,dashData})
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get Doctor profile for doctor panel 

const getDoctorprofile = async(req,res)=>{
    try{
const{docId}=req.body
const profileData = await doctorsModel.findById(docId).select('-password')
res.json({success:true,profileData})
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// api to update profile data for doctor panel
const updateProfile =async(req,res)=>{
try{
const{docId,fees,address,available}=req.body
await doctorsModel.findByIdAndUpdate(docId,{fees,address,available})
res.json({success:true,message:'Profile Updated'})
}catch(error){
    console.log(error)
    res.json({ success: false, message: error.message })
}
}
export {changeavailability,doctorList,loginDoctor,appointmentDoctor,appointmentcompleted,appointmentcancelled,doctorDashboard,getDoctorprofile,updateProfile}
