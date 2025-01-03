import express from 'express'
import { getCurrentUser, deletePhotoProfile, updateUser } from '../controllers/userController.js'
import { validateUpdateUser } from '../middleware/validationMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const router = express.Router()

router.route('/current-user')
    .get(getCurrentUser)

router.route('/delete-profile')
    .patch(deletePhotoProfile)

router.route('/edit')
    .patch(upload.single('photo'), validateUpdateUser, updateUser)

export default router