import jwt from 'jsonwebtoken'
export const isLoggedIn = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if(!token){
            req.user = null
            return res.status(500).json({
                success:false,
                message:"Invalid token"
            })
        }
        const user = await jwt.verify(token,process.env.JWT_SECRET);
        if(!user){
            return res.status(500).json({
                success:false,
                message:"token expired please login again"
            })
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        req.user=null
        return res.status(500).json({
            success:false,
            message:"please login again"
        })
    }
}
