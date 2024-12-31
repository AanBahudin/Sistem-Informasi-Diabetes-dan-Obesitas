import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    contact: String,
    message: String
}, { timestamps: true, timeseries: true })


export default mongoose.model('Message', MessageSchema)