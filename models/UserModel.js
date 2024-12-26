import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nama : String,
    email: String,
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
            enum: ['Kurang', 'Sehat', 'Kelebihan', 'Obesitas'],
            default: 'Sehat'
        },
        kadarGula: {
            type: Number,
            default: 0
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
    jenisKelamin: String,
    tanggalLahir: Date,
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true })

export default mongoose.model('User', UserSchema);