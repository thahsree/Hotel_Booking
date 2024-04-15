const User = require('../Model/User');
const bcrypt = require('bcrypt');
const { createError } = require('../utils/error');
const jwt = require('jsonwebtoken')
const register = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPWD = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({
            ...req.body,
            password:hashedPWD
        }) 
        await newUser.save()
        res.status(200).json("User has been created")
    } catch (error) {
        next(error)
    }
}

const login = async(req,res,next)=>{
    try {
        
        const {username } = req.body

        const foundUser = await User.findOne({username})

        if(!foundUser) return next(createError(404,'user not found'))


        const match =await bcrypt.compare(req.body.password, foundUser.password)

        if(!match) return next(createError(401,'incorrect passsword'))

        const token = jwt.sign(
            {id:foundUser._id , isAdmin:foundUser.isAdmin},
            process.env.JWT
        )
        
        const {password ,isAdmin ,...others} = foundUser._doc

        res.cookie('access_token',token , {httpOnly:true ,secure:true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json({details:{...others }, isAdmin , token})
    } catch (error) {
        next(error)
    }
}


module.exports =  {register , login}