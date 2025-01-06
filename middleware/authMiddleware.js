import { verifyToken } from '../utils/jwt.js'
import { NotAuthenticatedError, UnathorizedError } from './ErrorHandlerMiddleware.js'


export const authenticatedUser = (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        throw new NotAuthenticatedError('Error')
    }

    
    try {
        const isTokenValid = verifyToken(token)
        req.user = { ...isTokenValid }
        next()
    } catch (error) {
        throw new NotAuthenticatedError('authenticated failed')
    }
}

export const authorizedAdminPermission = (req, res, next) => {
    const { role } = req.user
    
    if (role !== 'admin') {
        throw new UnathorizedError('your are not Authorized')
    }

    next()
}

export const authorizedUserPermission = () => {
    const { role } = req.user
    
    if (role !== 'user') {
        throw new UnathorizedError('Not Authorized')
    }

    next()
}