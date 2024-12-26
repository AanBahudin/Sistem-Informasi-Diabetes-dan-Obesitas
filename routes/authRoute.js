import express from 'express'
import { register, login, logout } from '../controllers/authController.js'
import { validateRegister, validateLogin } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.route('/register')
    .post(validateRegister, register)

router.route('/login')
    .post(validateLogin, login)

router.route('/logout')
    .get(logout)


export default router