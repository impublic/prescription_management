import express from 'express'

import {appointmentDoctor, doctorList,loginDoctor,appointmentcompleted,appointmentcancelled,doctorDashboard,getDoctorprofile,updateProfile} from '../controller/doctorcontroller.js'
import authDoctor from '../middlewares/authDoctor.js'
const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/logins',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentcompleted)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentcancelled)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,getDoctorprofile)
doctorRouter.post('/update-profile',authDoctor,updateProfile)
export default doctorRouter
