import express from 'express'
import { sendMessage } from '../controllers/messageController.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router()

router.post('/send/:id',isLoggedIn,sendMessage)

export default router;