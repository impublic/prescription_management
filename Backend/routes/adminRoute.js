import express from 'express'
import { addDoctor,adminDashboard,alldoctors,appointmentCancel,appointmentsadmin,loginAdmin } from '../controller/admincontroller.js';
import upload from "../middlewares/multer.js";
import authAdmin from '../middlewares/authAdmin.js';
import { changeavailability } from '../controller/doctorcontroller.js';
import authuser from '../middlewares/authuser.js';

const adminRouter = express.Router()
adminRouter.post('/add-Doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin,alldoctors)
adminRouter.post('/change-availability',authAdmin,changeavailability)
adminRouter.get('/appointments',authAdmin,appointmentsadmin)
adminRouter.post('/cancel-appointments',authAdmin,appointmentCancel)
adminRouter.get('/dashBoard',authAdmin,adminDashboard)


export default adminRouter