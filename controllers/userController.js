import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'

export const getCurrentUser = async(req, res) => {
    const user = await User.findOne({_id: req.user.user_id})

    return res.status(StatusCodes.OK).json({msg: 'success', user})
}

export const updateUser = async(req, res) => {
    
}