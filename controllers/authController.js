import { BadRequestError, NotAuthenticatedError } from "../middleware/ErrorHandlerMiddleware.js";
import UserModel from "../models/UserModel.js"
import { comparePassword, hashPassword } from '../utils/passwordUtils.js'
import { StatusCodes } from "http-status-codes";
import { createToken } from '../utils/jwt.js'

export const register = async(req, res) => {

    req.body.password = await hashPassword(req.body.password);
    const registeredUser = await UserModel.create(req.body);

    return res.status(StatusCodes.CREATED).json({ msg: 'Successfully registered', user: registeredUser })
}

export const login = async(req, res) => {
    const isUserExist = await UserModel.findOne({email: req.body.email})
    if (!isUserExist) {
        throw new BadRequestError('Not found email');
    }

    const isPasswordCorrect = await comparePassword(req.body.password, isUserExist.password);
    
    if (!isPasswordCorrect) {
        throw new NotAuthenticatedError('password is wrong!')
    }

    const { _id, name, email } = isUserExist
    const token = createToken({user_id: _id, name, email })

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    });

    return res.status(StatusCodes.OK).json({ msg: 'Login successfully' })

}

export const logout = async(req, res) => {
    res.cookie('logout', logout, {
        expires: new Date(Date.now() + 1000)
    })

    return res.status(StatusCodes.OK).json({ msg: 'Successfully logout' })
}

