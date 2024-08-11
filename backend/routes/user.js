const { Router } = require("express");
const router = Router()
const User = require('../db')
const signupSchema = require("../schema")
const userBody = require("../schema")
const signinBody = require("../schema")
const {jwt} = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const { userMiddleware } = require('../middleware')
const zod = require("zod")


router.post('/signup', async (req, res) => {
    const body = req.body
    const obj= signupSchema.safeParse(req.body)
    if (!obj.success){
        return res.json({message: "Something went wrong"})
    }
    const user = await User.findOne({
        'username': body.username
    })
    if (user){
        return res.json({message: "Email already exist"})
    }
    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id,
    }, JWT_SECRET)
    res.json({
        message: "User created",
        token: token
    })
})
    

router.post('/signin', userMiddleware, async (req, res) => {
    const {success} = signinBody.safeParse(req.body);
    if (!success){
        return res.status(411).json({'msg':'invalid input'})
    }
    const user = await User.findOne({
        'username': req.body.username,
        'password': req.body.password,
    })
    if (user) {
        const token = jwt.sign({
        userId: user._id
        }, JWT_SECRET);
        
        res.json({
        token: token
        })
        return;
    }
    res.status(411).json({message: "Error while logging in"})
})

router.put('/update', userMiddleware ,async (req, res) => {
    body = req.body;
    const obj = userBody.safeParse(body)
    if (!obj.success){
        return res.status(411).json({message: "Something went wrong"})
    }
    await User.updateOne(body,{
        id: req.userId
    })
    res.json({
        'message': 'Updated successfully'
    })
})

router.get('/bulk', userMiddleware, async (req, res) => {
    const filter = req.query.filter || ''
    const users = await User.find({
        $or: [{
            first_name:{
                "$regex": filter
            },
            last_name:{
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            id: user._id,
        }))
    })
})

module.exports = router