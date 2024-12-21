import NewsModel from '../models/NewsModel.js'

export const addNews = async(req, res) => {
    res.send('add news')
}

export const getAllNews = async(req, res) => {
    res.send('get all news')
}

export const getSingleNews = async(req, res) => {
    res.send('get single news')
}

export const updateNews = async(req, res) => {
    res.send('update news')
}

export const deleteNews = async(req, res) => {
    res.send('delete news')
}