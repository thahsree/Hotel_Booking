import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import useFetch from '../../hooks/useFetch';
import './newRoom.css';
function NewRoom({ input, title }) {

    const [info, setInfo] = useState({});
    const [hotelID, setHotelID] = useState(undefined)
    const [rooms , setRooms] = useState([])

    const { data, loading, error, reFetch } = useFetch(`https://hotel-booking-5hga.onrender.com/api/hotels`);

    const handleChange = e => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async(e) => {
        e.preventDefault()
        const roomNumbers = rooms.split(',').map(room=>({number:room}))
        console.log(info);
        try {

            await axios.post(`https://hotel-booking-5hga.onrender.com/api/rooms/${hotelID}`,{...info,roomNumbers},{
                withCredentials: true // Add this option to include cookies
            } )

            console.log('completed');
            
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form >
                            {
                                input.map((item) => (
                                    <div className="formInput" key={item.id}>
                                        <label >{item.label}</label>
                                        <input onChange={handleChange} id={item.id} autoComplete='off' type={item.type} placeholder={item.placeholder} />
                                    </div>
                                ))
                            }
                            <div className="formInput" >
                                <label >rooms</label>
                                <textarea onChange={e=>setRooms(e.target.value)} placeholder='give comma between room numbers'/>
                            </div>
                            <div className="formInput">
                                <label >choose hotel/resort</label>
                                <select id="hotelID" onChange={e => setHotelID(e.target.value)}>
                                    {
                                        loading ? "loading" :
                                            data && data.map(hotel => (
                                                <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                            ))
                                    }
                                </select>
                            </div>


                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewRoom;