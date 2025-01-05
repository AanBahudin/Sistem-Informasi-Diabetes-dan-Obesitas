import { StatusCodes } from 'http-status-codes';
import Message from '../models/MessageModel.js'

export const addMessage = async(req, res) => {
    req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
    await Message.create(req.body);

    return res.status(StatusCodes.CREATED).json({ msg: 'message successfully send!' })
};

export const getAllMessage = async(req, res) => {
    const messges = await Message.find({})
    const countDocuments = await Message.countDocuments()

    return res.status(StatusCodes.OK).json({ messges, total: countDocuments })
} 

export const getSingleMessage = async(req, res) => {
    res.send('get all message')
}

export const deleteMessage = async(req, res) => {
    res.send('delete message')
}