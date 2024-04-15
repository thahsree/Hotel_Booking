import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/navbar/Navbar';
import { authContext } from '../../context/authContext';
import './login.css';
function Login(props) {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const { user, loading, error, dispatch } = useContext(authContext)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {

            const response = await axios.post('https://hotel-booking-api-teal.vercel.app/api/auth/login', credentials )

            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details })
            const prevLocation = localStorage.getItem("prevLocation")

            if (prevLocation) {
                localStorage.removeItem('prevLocation')
                navigate(prevLocation)

            } else {
                navigate('/')
            }
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }
    }
    console.log(user);
    return (
        <>
            <Navbar hideNav={true} />

            <div className='login'>
                <div className="headingmain">
                    <span className="heading">L</span>
                    <span className="heading">O</span>
                    <span className="heading">G</span>
                    <span className="heading">I</span>
                    <span className="heading">N</span>
                </div>
                <div className="container">
                    <input type="text" autoComplete='none' placeholder='username' id='username' onChange={handleChange} className='lInput' />
                    <input type="password" autoComplete='none' placeholder='password' id='password' onChange={handleChange} className='lInput' />
                    <button disabled={loading} onClick={handleLogin} className="lButton">LOGIN</button>
                    <Link style={{ color: '#003580', fontWeight: '300', textDecoration: 'underline' }} to="/signup">Dont have an account?</Link>
                    {
                        error &&
                        <span className='errorMsg'>{error.message}</span>
                    }
                </div>

            </div>
        </>
    );
}

export default Login;