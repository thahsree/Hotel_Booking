import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authContext } from '../../context/authContext';
import './navbar.css';
function Navbar({ hideNav }) {

    const { user, dispatch } = useContext(authContext)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div className='navbar'>
            <div className="navContainer">
                <NavLink to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                    <span className="logo">Booking.com </span>
                </NavLink>
                {
                    user ?
                        <>
                            <div className="navItems">
                                <span>{user.username}</span>
                                <button onClick={handleLogout} className="navButton">Logout</button>
                            </div>
                        </> :
                        <div className="navItems">
                            {
                                !hideNav &&
                                <>
                                    <button className="navButton">Register</button>
                                    <Link to='/login'>
                                        <button className="navButton">Login</button>
                                    </Link>
                                </>
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default Navbar;