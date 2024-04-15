import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { authContext } from '../../context/AuthContext';
import './login.css';
function Login(props) {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const cookies = new Cookies()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const {admin , loading , error ,dispatch} = useContext(authContext)
    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {

            const response = await axios.post('https://hotel-booking-5hga.onrender.com/api/auth/login', credentials)

            if(response.data.isAdmin){
                dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
                cookies.set('access_token', response.data.token, { path: '/' })

            navigate('/')
            }else{
                dispatch({ type: "LOGIN_FAILED", payload: {message:"Admin not Valid" }})
                console.log('failed',response.data.details);
            }
        } catch (error) {
            dispatch({ type: "LOGIN_FAILED", payload: error.response.data })
        }
    }
    console.log();
    return (
        <div className='loginContainer'>
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
                    <button onClick={handleLogin} className="lButton">LOGIN</button>
                    <Link style={{ color: '#003580', fontWeight: '300', textDecoration: 'underline' }} to="/signup">Dont have an account?</Link>
                    {
                        error &&
                        <span className='errorMsg'>{error.message}</span>
                    }
                </div>

            </div>
        </div>
    );
}

export default Login;