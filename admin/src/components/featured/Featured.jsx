import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './featured.css';
function Featured(props) {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Revenue </h1>
                <MoreVertOutlinedIcon fontSize='small' />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={80}
                        text={`70%`}
                        background
                        backgroundPadding={6}
                        strokeWidth={3}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </div>
                <p className="title">Total sales of the day</p>
                <p className="amount">₹7500</p>
                <p className="desc">
                    Previous transactions processing...
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon  fontSize='small'/>
                            <div className="resultAmount">₹1,50,000</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                            <div className="resultAmount">₹1,50,000</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="resultAmount">₹1,50,000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;