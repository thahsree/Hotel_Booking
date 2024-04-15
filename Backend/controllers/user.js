const User = require('../Model/User')

const createUser = async(req,res,next)=>{
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        next(error)
    }
}

const updateUser = async(req,res,next)=>{
    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id , {$set: req.body},{new:true})

        res.status(200).json(updatedUser)
        
    } catch (error) {
        next(error)
    }
}

const deleteUser = async(req,res,next)=>{
    try {

        await User.findByIdAndDelete(req.params.id)

        res.status(200).json('user has been deleted')
        
    } catch (error) {
        next(error)
    }
}

const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

const getUsers = async(req,res,next)=>{

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {getUser , getUsers , deleteUser , updateUser ,createUser}