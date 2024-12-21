import express from 'express'
import { 
    addNews,
    getAllNews,
    getSingleNews,
    updateNews,
    deleteNews
 } from '../controllers/newsController.js'

const router = express.Router()


router.route('/')
    .get(getAllNews)
    .post(addNews)

router.route('/:id')
    .get(getSingleNews)
    .patch(updateNews)
    .delete(deleteNews)

export default router