import {Router} from 'express'
import { loginController, registerController } from '../controllers/userController.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login',loginController);
router.post('/register',registerController)
router.post('/seetings',isLoggedIn,(req,res)=>{
    return res.status(200).json({
        success:false,
        user:req.user||null
    })
})
export default router