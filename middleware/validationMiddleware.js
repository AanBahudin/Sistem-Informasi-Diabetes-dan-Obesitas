import { body, validationResult } from "express-validator";
import { UnathorizedError, BadRequestError } from '../middleware/ErrorHandlerMiddleware.js'
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {  
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map((error) => error.msg);
                
                if (errorMessage[0].startsWith('not authrorized')) {
                    throw new UnathorizedError('not authorized to access this route');
                }

                throw new BadRequestError(errorMessage)
            }
            next();
        }
    ]
}


// ============================        LOGIN         ============================================

export const validateLogin = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('Please provide email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Please provide password')
        .isLength({ min: 6, max: 10 })
        .withMessage('Password min 6, max 10 characters')
])

export const validateRegister = withValidationErrors([
    body('name')
        .notEmpty()
        .withMessage('Please provide name')
        .isLength({ min: 3, max: 30 })
        .withMessage('name must be mininum 3 characters and 30 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Please provide email')
        .isEmail()
        .withMessage('Email is not valid')
        .custom( async (email) => {
            const isUserExist = await User.findOne({email});
            if (isUserExist) {
                throw new BadRequestError('email already exist')
            }
        } ),
    body('password')
        .notEmpty()
        .withMessage('Please provide password')
        .isLength({min: 6, max: 15})
        .withMessage('Password min 6, max 10 characters'),
    body('jenisKelamin')
        .notEmpty()
        .withMessage('Jenis Kelamin tidak boleh kosong')
        .isIn(['Pria', 'Wanita'])
        .withMessage('Jenis kelamin tidak valid')
])


// ============================        MESSAGE         ============================================

export const validateMessage = withValidationErrors([
    body('firstName')
        .notEmpty()
        .withMessage('Please provide first name')
        .isLength({ min: 3 })
        .withMessage('first name is too short'),
    body('lastName')
        .notEmpty()
        .withMessage('Please provide last name')
        .isLength({ min: 3 })
        .withMessage('last name is too short'),
    body('email')
        .notEmpty()
        .withMessage('please provide email')
        .isEmail()
        .withMessage('invalid email format'),
    body('contact')
        .notEmpty()
        .withMessage('please provide phone number')
        .isInt()
        .withMessage('invalid contact informations')
        .isLength({ min: 10, max: 12 })
        .withMessage('invalid phone number'),
    body('message')
        .notEmpty()
        .withMessage('please provide message')
        .isLength({ min: 10, max: 300 })
        .withMessage('message is 10 & 300 characters long'),
])