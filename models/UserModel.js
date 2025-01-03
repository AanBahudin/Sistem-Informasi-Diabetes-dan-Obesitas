import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nama : String,
    email: String,
    nomorTelepon: String,
    password: String,
    data_kesehatan: {
        beratBadan: {
            type: Number,
            default: 0
        },
        tinggiBadan: {
            type: Number,
            default: 0
        },
        IBM: {
            type: Number,
            default: 0
        },
        IBMStatus: {
            type: String,
            enum: ['-', 'Kekurangan', 'Sehat', 'Kelebihan', 'Obesitas'],
            default: 'Sehat'
        },
        kondisiTubuh: {
            type: String,
            default: 'Sehat'
        },
        kadarGula: {
            type: Number,
            default: 0
        },
        statusKadarGula: {
            type: String,
            enum: ['-', 'Kekurangan', 'Normal', 'Pre Diabetes', 'Diabetes'],
            default: 'Normal'
        },
        targetKesehatan: {
            type: String,
            enum: ['Menurunkan Berat Badan', 'Mempertahankan Berat Badan', 'Menaikkan Berat Badan'],
            default: 'Menurunkan Berat Badan'
        },
        jenisDiet: {
            type: String,
            enum: ['Diet Rendah Karbohidrat', 'Diet Rendah Gula', 'Diet Vegatarian', 'Diet Rendah Lemak', 'Diet Tinggi Protein'],
            default: 'Diet Rendah Karbohidrat'
        }
    },
    photo: String,
    photoPublicId: String,
    jenisKelamin: {
        type: String,
        enum: ['Pria', 'Wanita'],
        default: 'Pria'
    },
    tanggalLahir: {
        type: Date,
        default: new Date(Date.now())
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true })

export default mongoose.model('User', UserSchema);