import React from 'react';
import { Link } from 'react-router-dom';
import './searchItem.css';
function SearchItem({item}) {
    return (
        <div className='searchItem'>
            <img src={item.photos[0]} alt="" className="siImg" />
            <div className="siDesc">
                <h1 className='siTitle'>{item.name}</h1>
                <span className='siDistance'>{item.distance} from center</span>
                <span className="taxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">
                    {item.description}
                </span>
                <span className="siCancelOp">free cancellation</span>
                <span className="siCancelOPSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>

            </div>
            <div className="siDetails">
               {
                item.rating && 
                <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>
               }
                <div className="siDetailText">
                    <span className="siPrice">₹{item.cheapestPrice}</span>
                    <span className="siTaxOp">includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className='siCheckButton'>See availability</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default SearchItem;