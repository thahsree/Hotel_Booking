const express = require('express')
const { verifyAdmin } = require('../utils/verifyToken')
const { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } = require('../controllers/room')
const router = express.Router()

//create
router.post('/:hotelid',verifyAdmin, createRoom)

//update
router.put('/:id',verifyAdmin, updateRoom)

router.put('/available/:id', updateRoomAvailability)

//delete
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom)

//get
router.get('/:id',getRoom)

//get all
router.get('/',getRooms)
module.exports = router