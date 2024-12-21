import express from 'express'
import { getCurrentUser, updateUser } from '../controllers/userController.js'

const router = express.Router()

router.route('/current-user')
    .get(getCurrentUser)

router.route('/edit/:id')
    .patch(updateUser)

export default router