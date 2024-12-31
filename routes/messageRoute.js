import express from 'express'
import { addMessage, getAllMessage, getSingleMessage, deleteMessage } from '../controllers/messageController.js'
import { validateMessage } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.route('/')
    .get(getAllMessage)
    .post(validateMessage, addMessage)

router.route('/:id')
    .get(getSingleMessage)
    .delete(deleteMessage)

export default router