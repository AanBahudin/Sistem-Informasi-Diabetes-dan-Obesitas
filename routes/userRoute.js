import express from 'express'
import { getCurrentUser, deletePhotoProfile, updateUser } from '../controllers/userController.js'
import { validateUpdateUser } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.route('/current-user')
    .get(getCurrentUser)

router.route('/delete-profile')
    .patch(deletePhotoProfile)

router.route('/edit')
    .patch(validateUpdateUser, updateUser)

export default router