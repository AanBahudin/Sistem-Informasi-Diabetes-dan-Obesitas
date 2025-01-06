import { StatusCodes } from 'http-status-codes'
import News from '../models/NewsModel.js'
import User from '../models/UserModel.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'


export const addNews = async(req, res) => {

    req.body.createdBy = req.user.user_id
    if(req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path)
        req.body.thumbnail = response.secure_url
        req.body.thumbnailId = response.public_id
    }

    await News.create(req.body)
    return res.status(StatusCodes.CREATED).json({msg: 'Artikel ditambahkan!'})
}

export const getAllNews = async(req, res) => {
    const { judul } = req.query
    let news = []

    if (!judul) {
        news = await News.find(); 
    } else {
        news = await News.find({
            judulArtikel: { $regex: judul, $options: 'i' }
        })
    }

    return res.status(StatusCodes.OK).json({news, total: news.length})
}

export const getSingleNews = async(req, res) => {
    const news = await News.findOne({judulArtikel: req.params.id})
    return res.status(StatusCodes.OK).json({news});
}

export const updateNews = async(req, res) => {
    if(req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path)
        req.body.thumbnail = response.secure_url
        req.body.thumbnailId = response.public_id
    }

    await News.findOneAndUpdate({ judulArtikel: req.params.id }, req.body, { new: true, runValidators: true })
    return res.status(StatusCodes.OK).json({ msg:'update berhasil!' })
}

export const addBookmark = async(req, res) => {

    const userId = req.body.user_id
    const { id : addedNewsId } = req.params

    // WILL REFACTOR LATER
    const isAlreadyExist = await User.find({_id: userId, bookmark: addedNewsId})
    if (isAlreadyExist) {
        return res.status(StatusCodes.OK).json({ msg: 'Artikel sudah ada' })
    }

    await User.findOneAndUpdate({_id: userId}, {$push : { bookmark: addedNewsId}})
    return res.status(StatusCodes.OK).json({  msg: 'successfully'})
}

export const addFavorite = async(req, res) => {
    const userId = req.body.user_id
    const { id : addedNewsId } = req.params

    // WILL REFACTOR LATER
    const isAlreadyExist = await User.find({_id: userId, favorite: addedNewsId})
    if (isAlreadyExist) {
        return res.status(StatusCodes.OK).json({ msg: 'Artikel sudah ada' })
    }

    await User.findOneAndUpdate({_id: userId}, {$push : { favorite: addedNewsId}})
    return res.status(StatusCodes.OK).json({  msg: 'successfully'})
}

export const deleteBookmark = async(req, res) => {
    return res.status(StatusCodes.OK).json({msg: 'successfully'})
}

export const deleteFavorite = async(req, res) => {
    return res.status(StatusCodes.OK).json({msg: 'successfully'})
}

export const deleteNews = async(req, res) => {
    const { id } = req.params    

    await News.findOneAndDelete({_id: id})
    return res.status(StatusCodes.OK).json({msg: 'Berhasil dihapus'})
}