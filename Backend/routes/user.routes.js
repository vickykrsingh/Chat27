import {Router} from 'express'
import { getAllUsers, getUserById, loginController, logout, registerController } from '../controllers/userController.js';
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
router.get('/logout',logout);
router.get('/get-all-users',isLoggedIn,getAllUsers)
router.get('/get-user/:id',isLoggedIn,getUserById)
export default router