const express = require('express')
const { createUser, updateUser, deleteUser, getUser, getUsers } = require('../controllers/user')
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken')

const router = express.Router()


// router.get('/checkauth',verifyToken , (req,res,next)=>{
//     res.json('you are loggedin')
// })

// router.get('/checkuser/:id' , verifyUser, (req,res,next)=>{
//     res.json('you are loggedin, you can delete your account')
// })


// router.get('/checkadmin/:id' , verifyAdmin, (req,res,next)=>{
//     res.json('you are loggedin, you can delete all account')
// })

//update
router.put('/:id', verifyUser, updateUser)

//delete
router.delete('/:id',verifyUser, deleteUser)

//get
router.get('/:id', verifyUser,getUser)

//get all
router.get('/',verifyAdmin, getUsers)

module.exports = router