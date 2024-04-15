import { format } from 'date-fns';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/header/Header';
import Navbar from '../../Components/navbar/Navbar';
import SearchItem from '../../Components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import './list.css';
function List(props) {
    const location = useLocation()

    console.log(location);

    const [destination, setDestination] = useState(location.state?.destination)
    const [options, setOptions] = useState(location.state?.options)
    const [date, setDate] = useState(location.state?.date)
    const [openDate, setOpenDate] = useState(false)
    const [min , setMin] = useState(undefined);
    const [max , setMax] = useState(undefined)

    const { data, loading, err, reFetch } = useFetch(`https://hotel-booking-5hga.onrender.com/api/hotels?city=${destination}&min=${min || 0 }&max=${max || 15000}`)

    const handleSubmit = ()=>{
        reFetch()
    }
    return (
        <div>
            <Navbar />
            <Header type='list' />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label htmlFor="">Destination</label>
                            <input type="text" placeholder={destination} />
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Check-in date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="lsItem">
                            <label >Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionitem">
                                    <span className="lsOptionText">
                                        Min Price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e=> setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionitem">
                                    <span className="lsOptionText">
                                        Max Price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e=> setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionitem">
                                    <span className="lsOptionText">
                                        Adult
                                    </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                                </div>
                                <div className="lsOptionitem">
                                    <span className="lsOptionText">
                                        Children
                                    </span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                                </div>
                                <div className="lsOptionitem">
                                    <span className="lsOptionText">
                                        Room
                                    </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                                </div>
                            </div>
                           
                        </div>
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                    <div className="listResult">
                           {
                            loading ? 'loading':
                            <>
                                {data.map(item=>(
                                    <SearchItem item={item} key={item._id}/>
                                ))}
                            </>
                           }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;