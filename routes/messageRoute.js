import express from 'express'
import { addMessage, getAllMessage, getSingleMessage, deleteMessage } from '../controllers/messageController.js'
import { validateMessage } from '../middleware/validationMiddleware.js'
import { authenticatedUser, authorizedAdminPermission } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(authenticatedUser, authorizedAdminPermission, getAllMessage)
    .post(validateMessage, addMessage)

router.route('/:id')
    .get(authenticatedUser, authorizedAdminPermission, getSingleMessage)
    .delete(authenticatedUser, authorizedAdminPermission, deleteMessage)

export default router