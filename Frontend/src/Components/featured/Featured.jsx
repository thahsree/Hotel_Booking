import React from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.css';
function Featured(props) {

    const {data , loading , err , reFetch} = useFetch("https://hotel-booking-5hga.onrender.com/api/hotels/countbycity?cities=Kannur,Taliparamba,Payyannur")

    
    return (
        <div className='featured'>
            {
                loading? 'loading' :
                <>
                    <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/684741.jpg?k=8c41bcf34cc0d96ff2208796dc11e047e10da8adb0430b01bc2716ac99443fee&o=" alt="" className='featuredImg'/>
                <div className="featuredTitles">
                    <h1>Kannur</h1>
                    <h2>{data[0]} Properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="" className='featuredImg'/>
                <div className="featuredTitles">
                    <h1>Taliparamba</h1>
                    <h2>{data[1]} Properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/684572.jpg?k=f74af2be72834d9953c8096834db666c7769c5f6c1ba230d6fe5591ba84dd33d&o=" alt="" className='featuredImg'/>
                <div className="featuredTitles">
                    <h1>Payyannur</h1>
                    <h2>{data[2]} Properties</h2>
                </div>
            </div>
                </>
            }
        </div>
    );
}

export default Featured;