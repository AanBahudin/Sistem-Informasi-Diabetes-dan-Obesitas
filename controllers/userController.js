import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import { promises as fs } from 'fs'
import cloudinary from 'cloudinary'

export const getCurrentUser = async(req, res) => {
    const user = await User.findOne({_id: req.user.user_id})
    return res.status(StatusCodes.OK).json({msg: 'success', user})
}

export const deletePhotoProfile = async(req, res) => {
    await User.findByIdAndUpdate({_id: req.user.user_id}, { photo: '' }, {new: true, runValidators: true});
    return res.status(StatusCodes.OK).json({ msg: 'Berhasil dihapus' })
}

export const updateUser = async(req, res) => {
        
    const tanggalUser= req.body.tanggalLahir
    const [day, month, year] = tanggalUser.split('/');
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // set BMI
    const newBerat = Number(req.body.beratBadan)
    const newTinggi = Number(req.body.tinggiBadan)/100
    if ( newTinggi > 0 && newBerat > 0) {
        req.body.IBM = (newBerat / (Math.pow(newTinggi, 2))).toFixed(2);
        const beratBadanIdeal = newBerat / (Math.pow(newTinggi, 2));

        if (beratBadanIdeal >= 18,5 && beratBadanIdeal <= 24,9) {
            req.body.IBMStatus = 'Sehat'
        } else if (beratBadanIdeal < 18,5) {
            req.body.IBMStatus = 'Kekurangan'
        } else if (beratBadanIdeal >= 25 && beratBadanIdeal <= 29,9) {
            req.body.IBMStatus = 'Kelebihan'
        } else {
            req.body.IBMStatus = 'Obesitas'
        }
    }

    if (newTinggi === 0 || newBerat === 0 ) {
        req.body.IBM = '0'
        req.body.IBMStatus = '-'
    }


    // set status kadar gula
    const newKadarGula = Number(req.body.kadarGula)
    if (newKadarGula < 40) {
        req.body.statusKadarGula = '-'
    } else if (newKadarGula >= 40 && newKadarGula <= 70) {
        req.body.statusKadarGula = 'Kekurangan'
    } else if (newKadarGula > 70 && newKadarGula < 140) {
        req.body.statusKadarGula = 'Normal'
    } else if (newKadarGula >= 140 && newKadarGula < 200) {
        req.body.statusKadarGula = 'Pre Diabetes'
    } else {
        req.body.statusKadarGula = 'Diabetes'
    }

    // image upload
    if(req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path)
        req.body.photo = response.secure_url
        req.body.photoPublicId = response.public_id
    }

    const newData = {
        nama: req.body.nama,
        email: req.body.email,
        nomorTelepon: req.body.nomorTelepon,
        data_kesehatan: {
            beratBadan: req.body.beratBadan,
            tinggiBadan: req.body.tinggiBadan,
            IBM: req.body.IBM,
            IBMStatus: req.body.IBMStatus,
            kondisiTubuh: req.body.kondisiTubuh,
            kadarGula: req.body.kadarGula,
            statusKadarGula: req.body.statusKadarGula,
            targetKesehatan: req.body.targetKesehatan,
            jenisDiet: req.body.jenisDiet, 
        },
        jenisKelamin: req.body.jenisKelamin,
        tanggalLahir: parsedDate,
        photo: req.body.photo,
        photoPublicId: req.body.photoPublicId
    }

    const updatedUser = await User.findOneAndUpdate({ _id: req.user.user_id }, newData,  { new: true, runValidators: true } )

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }   

    return res.status(StatusCodes.OK).json({ msg: 'Berhasil di update!' })
}