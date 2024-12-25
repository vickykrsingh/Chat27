import express from 'express'
import { sendMessage } from '../controllers/messageController.js';
const router = express.Router()

router.post('/send/:id',sendMessage)

export default router;