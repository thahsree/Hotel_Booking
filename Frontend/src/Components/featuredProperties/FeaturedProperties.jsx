import React from 'react';
import useFetch from '../../hooks/useFetch';
import './featuredProperties.css';


function FeaturedProperties(props) {
    const { data, loading, err, reFetch } = useFetch("http://localhost:8080/api/hotels/?featured=true&queryLimit=4")
    return (
        <div className='fp'>
            {
                loading ? "loading" :
                    <>
                        {
                            data.map((item) => (
                                <div className="fpItem" key={item._id}>
                                    <img src={item.photos[0]} alt="" className='fpImg' />
                                    <span className="fpName">{item.name}</span>
                                    <span className="fpCity">{item.city}</span>
                                    <span className="fpPrice">₹{item.cheapestPrice}</span>
                                    {
                                        item.rating &&
                                        <div className="fpRating">
                                            <button>8.9</button>
                                            <span>Excellent</span>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    );
}

export default FeaturedProperties;