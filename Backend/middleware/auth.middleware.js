import jwt from 'jsonwebtoken'
export const isLoggedIn = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            req.user = null
            return res.status(500).json({
                success:false,
                message:"Invalid token",
                user:null
            })
        }
        const user = await jwt.verify(token,process.env.JWT_SECRET);
        if(!user){
            return res.status(500).json({
                success:false,
                message:"token expired please login again",
                user:null
            })
        }
        req.user = user;
        next()
    } catch (error) {
        req.user=null
        return res.status(500).json({
            success:false,
            message:"please login again"
        })
    }
}
