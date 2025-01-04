import mongoose from "mongoose";

const newsScheme = new mongoose.Schema({
    judulArtikel: {
        type: String,
        required: true,
        default: 'Untitled'
    },
    tagArtikel: {
        type: String,
        required: true,
    },
    penyutingArtikel: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true
    },
    jenisArtikel: {
        type: String,
        required: true,
        enum: ['Diabetes', 'Obesitas'],
        default: 'Diabetes'
    },
    tagar: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnailId: {
        type: String,
        required: true
    },
    referensi: {
        type: String,
        required: true,
    },
    editorContent: {
        type: String,
        required: true
    },  
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('News', newsScheme);