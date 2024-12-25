import { body, validationResult } from "express-validator";
import { UnathorizedError, BadRequestError } from '../middleware/ErrorHandlerMiddleware'

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

export const validateLogin = withValidationErrors([
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Please provide email'),
    body('password')
        .notEmpty()
        .withMessage('Please provide password')
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
        .custom(),                  // we'll be back later
    body('password')
])