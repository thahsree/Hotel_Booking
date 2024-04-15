const Hotel = require('../Model/Hotel')
const Room = require('../Model/Room')

const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

const updateHotel = async(req,res,next)=>{
    try {

        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id , {$set: req.body},{new:true})

        res.status(200).json(updatedHotel)
        
    } catch (error) {
        next(error)
    }
}

const deleteHotel = async(req,res,next)=>{
    try {

        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json('Hotel has been deleted')
        
    } catch (error) {
        next(error)
    }
}

const getHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

const getHotels = async (req, res, next) => {
    const { min, max, queryLimit, ...others } = req.query; // Renamed query parameter 'queryLimit' to 'queryLimit'
    
    try {
        let limit = parseInt(queryLimit); // Parsing the 'queryLimit' query parameter

        // Checking if 'queryLimit' is a valid number greater than 0, otherwise default to 3
        if (isNaN(limit) || limit <= 0) {
            limit = 100;
        }

        const minPrice = min ? parseFloat(min) : 1;  // Setting default value for min
        const maxPrice = max ? parseFloat(max) : 9999; // Setting default value for max
        
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: minPrice, $lt: maxPrice } // Using correct default values
        }).limit(limit);
        
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};



const countByCity = async(req,res,next)=>{
    
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
const countByType = async(req,res,next)=>{
    
    
    try {
        const hotelCount = await Hotel.countDocuments({type:'Hotel'})
        const apartmentCount =await  Hotel.countDocuments({type:'Apartment'})
        const resortCount =await Hotel.countDocuments({type:'Resort'})
        const cabinCount = await Hotel.countDocuments({type:'Cabin'})
        const villaCount = await Hotel.countDocuments({type:'Villa'})
        
        res.status(200).json([
            {type:'Hotels' , count:hotelCount},
            {type:'Apartments' , count:apartmentCount},
            {type:'Resorts' , count:resortCount},
            {type:'Cabins' , count:cabinCount},
            {type:'Villas' , count:villaCount}
        ])
    } catch (error) {
        next(error)
    }
}


const getHotelRooms = async(req,res,next) =>{
    try {

        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room =>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

module.exports = {getHotel , getHotels , deleteHotel , updateHotel ,createHotel ,countByCity , countByType ,getHotelRooms}