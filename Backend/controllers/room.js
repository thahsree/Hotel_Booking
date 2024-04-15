const Hotel = require('../Model/Hotel')
const Room = require('../Model/Room')


const createRoom = async(req,res,next)=>{
    const hotelID = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelID,{
                $push:{ rooms:savedRoom._id }
            })   
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }

}
const updateRoom = async(req,res,next)=>{
    try {

        const updatedRoom = await Room.findByIdAndUpdate(req.params.id , {$set: req.body},{new:true})

        res.status(200).json(updatedRoom)
        
    } catch (error) {
        next(error)
    }
}

const deleteRoom = async(req,res,next)=>{
    const hotelID = req.params.hotelid
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelID,{
                $pull:{ rooms: req.params.id}
            })   
        } catch (error) {
            next(error)
        }

        res.status(200).json('Room has been deleted')
        
    } catch (error) {
        next(error)
    }
}

const getRoom = async(req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

const getRooms = async(req,res,next)=>{
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}

const updateRoomAvailability = async(req,res,next)=>{

    try {

        await Room.updateOne({"roomNumbers._id":req.params.id},
        {
            $push:{
                "roomNumbers.$.unavailableDates":req.body.dates
            }
        })
        res.status(200).json('room status has been updated')
    } catch (error) {
        next(error)
    }
}

module.exports = {createRoom , updateRoom , getRoom , deleteRoom , getRooms ,updateRoomAvailability}