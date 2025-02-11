import mongoose from "mongoose";

const doctorsschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    available: { type: Boolean, required: true, default: true },
    about: { type: String, required: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Date, required: true }, // Changed to Date
    slots_booked: { type: Object, default: {} }
}, { minimize: false });

// module.exports = mongoose.model('Doctor', doctorSchema);


const doctorsModel = mongoose.models.doctors ||mongoose.model('doctor',doctorsschema)

export default doctorsModel;