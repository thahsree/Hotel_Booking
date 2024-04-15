import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../Components/footer/Footer';
import Header from '../../Components/header/Header';
import MailList from '../../Components/mailList/MailList';
import Navbar from '../../Components/navbar/Navbar';
import Reserve from '../../Components/reserve/Reserve';
import { authContext } from '../../context/authContext';
import { searchContext } from '../../context/searchContext';
import useFetch from '../../hooks/useFetch';
import './hotel.css';
function Hotel(props) {
    const [open, setOpen] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModel , setOpenModel] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const { data, loading, err, reFetch } = useFetch(`http://localhost:8080/api/hotels/find/${path}`)

    const {dates , options} = useContext(searchContext)
    
    const MILLISECONDS_PER_DAY = 1000*60*60*24;

    function dayDifference (date1,date2){
            const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
            const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
            return diffDays
    }
    const days = dayDifference(dates[0]?.endDate ,dates[0]?.startDate);

    const handleChange = (i) => {
        setSlideNumber(i)
        setOpen(true)
    }

    const handleMove = (direction) => {

        let newSlideNumber;

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 4 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 4 ? 0 : slideNumber + 1
        }
        setSlideNumber(newSlideNumber)
    }

    const {user } = useContext(authContext)
    const handleClick = ()=>{
        if(user){
            setOpenModel(true)
        }else{
            localStorage.setItem('prevLocation',location.pathname)
            navigate('/login')
        }
    }
    return (
        <div>
            <Navbar />
            <Header type="list" />
            {
                loading ? (
                    "loading"
                ) : (
                    <div className="hotelContainer">
                        {
                            open &&
                            <div className="slider">


                                <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
                                <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove('l')} />
                                <div className="sliderWrapper">
                                    <img alt="" src={data.photos[slideNumber]} className='sliderImg' />
                                </div>
                                <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove('r')} />
                            </div>
                        }
                        <div className="hotelWrapper">
                            <button onClick={handleClick} className='booknow'>Reserve or Book Now</button>
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAddress">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>{data.city} , {data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location - {data.distance} from center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ₹{data.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {
                                    data.photos?.map((photo, i) => (
                                        <div className="hotelImgWrapper" key={i}>
                                            <img onClick={() => handleChange(i)} src={photo} alt="" className="hotelImg" />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="hotelDetails">
                                <div className="hotelDetailsTexts">
                                    <h1 className="hotelTitle"> {data.title}</h1>
                                    <p className="hotelDesc">
                                       {data.description}
                                    </p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <h1>Perfect for {days}-night stay</h1>
                                    <span>Located in real heart of Kannur , this property has
                                        an excellent location score of 9.8
                                    </span>
                                    <h2>
                                        <b>₹{data.cheapestPrice * days * options.room}</b>({days}night)
                                    </h2>
                                    <button onClick={handleClick}>Reserve or Book Now</button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                )
            }
            {
                openModel && 
                <Reserve setOpen={setOpenModel} hotelId={path}/>
            }
        </div>
    );
}

export default Hotel;