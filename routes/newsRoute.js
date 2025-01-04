import express from 'express'
import { 
    addNews,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
 } from '../controllers/newsController.js'
import { authenticatedUser, authorizedAdminPermission } from '../middleware/authMiddleware.js'
import { validateNews } from '../middleware/validationMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const router = express.Router()


router.route('/')
    .get(getAllNews)
    .post(authenticatedUser, authorizedAdminPermission, upload.single('thumbnail'), validateNews, addNews)

router.route('/:id')
    .get(getSingleNews)
    .patch(authenticatedUser, authorizedAdminPermission, updateNews)
    .delete(authenticatedUser, authorizedAdminPermission, deleteNews)

export default router