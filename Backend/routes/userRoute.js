import express from 'express'
import { bookAppointment,cancelAppointment,getProfile,listAppointment,loginUser,paymentrazorpay,registerUser,updateprofile, verifyRazorpay } from '../controller/userController.js'
import authuser from '../middlewares/authuser.js'
import upload from '../middlewares/multer.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authuser,getProfile)
userRouter.post('/update-profile', upload.single('image'), authuser, updateprofile);
userRouter.post('/book-appointment',authuser,bookAppointment)
userRouter.get('/appointments',authuser,listAppointment)
userRouter.post('/cancel-appointment',authuser,cancelAppointment)
userRouter.post('/payment-razorpay',authuser,paymentrazorpay)
userRouter.post('/verify-razorpay',authuser,verifyRazorpay)


export default userRouter;