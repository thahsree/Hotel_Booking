const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const hotelsRoute = require('./routes/hotels')
const roomsRoute = require('./routes/rooms')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const corsConfig = {
    origin :"*",
    // credentials:true,
    methods:["GET","POST","DELETE","PUT"]
}

app.options("",cors(corsConfig))
app.use(cors(corsConfig));

app.use(express.json())

app.use(cookieParser())

dotenv.config()


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION)
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log('MONGODB Disconnected');
})
mongoose.connection.on("connected",()=>{
    console.log('MONGODB Connected');
})



app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/hotels',hotelsRoute)


//error handler
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || 'something went wrong'
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})

app.get('/',(req,res)=>{
    res.send('connected')
})

app.listen(8080,()=>{
    connectDB()
    console.log('connected to server PORT:8080');
})