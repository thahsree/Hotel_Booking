import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { searchContext } from "../../context/searchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

function Reserve({ setOpen, hotelId }) {

    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, err, reFetch } = useFetch(`https://hotel-booking-5hga.onrender.com/api/hotels/rooms/${hotelId}`)

    const { dates } = useContext(searchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())

        let list = []

        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return list
    }

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        )

        return !isFound
    }
    const handleSelect = (e) => {


        const checked = e.target.checked
        const value = e.target.value

        setSelectedRooms(
            checked ?
                [...selectedRooms, value] :
                selectedRooms.filter((item) => item !== value)
        )

    }

    const handleReserve = async() =>{
        try {
            await Promise.all(
                selectedRooms.map((roomId)=>{
                    const res =axios.put(`https://hotel-booking-5hga.onrender.com/api/rooms/available/${roomId}`,{
                        dates:allDates
                    })
                    return res.data
                })
            )
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {
                    data.map(item => (
                        <div className="rItem">
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.description}</div>
                                <div className="rMax">
                                    Max People: <b> {item.maxPeople}</b>
                                </div>
                                <div className="rPrice">₹{item.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item.roomNumbers.map(roomNumber => (
                                    <div className="room">
                                        <span>{roomNumber.number} </span>
                                        <input type="checkbox"
                                            value={roomNumber._id}
                                            onChange={handleSelect}
                                            disabled={!isAvailable(roomNumber)}
                                        />
                                    </div>
                                ))}
                            </div>


                        </div>
                    ))
                }
                <button onClick={handleReserve} className="rButton">Reserve Now</button>
            </div>
        </div>
    );
}

export default Reserve;