import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { modeContext } from '../../context/DarkMode';
import './sidebar.css';
function Sidebar(props) {

    const {darkMode  , dispatch} = useContext(modeContext)

    const handleDark = ()=>{
        try {
            dispatch({type:'dark'})
        } catch (error) {
            console.log(error);
        }
    }

    const handleLight = ()=>{
        try {
            dispatch({type:'light'})
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='sidebar'>
            <div className="top">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className="logo">Booking.com (Admin)</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>

                    <p className="title">LISTS</p>
                    <li>
                        <Link to='/users' style={{ textDecoration: 'none' }}>
                            <Person2OutlinedIcon className='icon' />
                            <span>USERS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/hotels' style={{ textDecoration: 'none' }}>
                            <Inventory2OutlinedIcon className='icon' />
                            <span>HOTELS</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/rooms' style={{ textDecoration: 'none' }}>
                            <Inventory2OutlinedIcon className='icon' />
                            <span>ROOMS</span>
                        </Link>
                    </li>

                    <p className="title">USEFUL</p>
                    <li>
                        <AnalyticsOutlinedIcon className='icon' />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneOutlinedIcon className='icon' />
                        <span>Notifications</span>
                    </li>

                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className='icon' />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className='icon' />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsOutlinedIcon className='icon' />
                        <span>Settings</span>
                    </li>

                    <p className="title">USER</p>
                    <li>
                        <AccountBoxOutlinedIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    <li>
                        <LoginOutlinedIcon className='icon' />
                        <span>Logout</span>
                    </li>

                </ul>
            </div>
            <div className="bottom">
                <div onClick={handleLight} className="colorOptions"></div>
                <div onClick={handleDark} className="colorOptions"></div>
            </div>
        </div>
    ); 
}

export default Sidebar;