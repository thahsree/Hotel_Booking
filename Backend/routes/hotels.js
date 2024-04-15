const express = require('express')
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } = require('../controllers/hotel')
const { verifyAdmin } = require('../utils/verifyToken')
const router = express.Router()

//create
router.post('/',verifyAdmin, createHotel)

//update
router.put('/:id',verifyAdmin, updateHotel)

//delete
router.delete('/:id',verifyAdmin, deleteHotel)

//get
router.get('/find/:id',getHotel)

//get all
router.get('/',getHotels)
router.get('/countbycity',countByCity)
router.get('/countbytype',countByType)
router.get('/rooms/:id',getHotelRooms)
// router.get('/countbytype',getHotels)
module.exports = router