const {User} = require("./db")
const {jwt} = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")

const  userMiddleware = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (!authheader || !authheader.startswith('Bearer ')){
        return res.status(403).json({})
    }
    const token = authheader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded.userId){
            req.userId = decoded.userId;
            next()
        } else{
            return res.status(403).json({})   
        }
    }
    catch(err){
        return res.status(403).json({})
    }

}

module.exports = {userMiddleware}