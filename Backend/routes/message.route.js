import express from 'express'
import { getMessage, sendMessage } from '../controllers/messageController.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router()

router.post('/send/:id',isLoggedIn,sendMessage)
router.get('/get-message/:id',isLoggedIn,getMessage)

export default router;