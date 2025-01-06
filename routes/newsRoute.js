import express from 'express'
import { 
    addNews,
    addBookmark,
    addFavorite,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteBookmark,
    deleteFavorite,
    deleteNews
 } from '../controllers/newsController.js'
import { authenticatedUser, authorizedAdminPermission } from '../middleware/authMiddleware.js'
import { validateNews } from '../middleware/validationMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

const router = express.Router()


router.route('/')
    .get(getAllNews)
    .post(authenticatedUser, authorizedAdminPermission, upload.single('thumbnail'), validateNews, addNews)

router.route('/favorite')
    .post(addFavorite)
    .delete(deleteFavorite)

router.route('/bookmark')
    .post(addBookmark)
    .delete(deleteBookmark)

    router.route('/:id')
    .get(getSingleNews)
    .patch(authenticatedUser, authorizedAdminPermission, upload.single('thumbnail'), updateNews)
    .delete(authenticatedUser, authorizedAdminPermission, deleteNews)

export default router