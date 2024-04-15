import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext } from 'react';
import { modeContext } from '../../context/DarkMode';
import './navbar.css';
function Navbar(props) {

    const {dispatch} = useContext(modeContext)

    const handleDarkMode = ()=>{

        try {
            dispatch({type:'toggle'})
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='search...'/>
                    <SearchOutlinedIcon/>
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className='icon'/>
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon onClick={handleDarkMode} className='icon'/>
                    </div>
                    <div className="item">
                        <FullscreenExitOutlinedIcon className='icon'/>
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className='icon'/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className='icon'/>
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className='icon'/>
                    </div>
                    <div className="item">
                        <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR-9ELVfKQi7PanMuugufOquNFrdN6_iIU3g&usqp=CAU" 
                        alt="" 
                        className='avatar'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;