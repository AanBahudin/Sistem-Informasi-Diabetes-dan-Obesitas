import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nama : String,
    email: String,
    password: String,
    data_kesehatan: {
        beratBadan: Number,
        tinggiBadan: Number,
        IBM: Number,
        IBMStatus: String,
        kadarGula: Number,
        targetKesehatan: String,
        jenisDiet: String,
    },
    photo: String,
    jenisKelamin: String,
    tanggalLahir: Date,
    role: String
}, { timestamps: true })

export default mongoose.model('User', UserSchema);