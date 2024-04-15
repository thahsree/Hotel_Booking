import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Person2Outlined from '@mui/icons-material/Person2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './widget.css';

function Widget({ type }) {

    let data;

    //temporary 

    const amount = 400
    const diff = 45

    switch (type) {
        case 'user':
            data = {
                title: "USERS",
                isMoney: false,
                link: 'see all users',
                icon: <Person2Outlined className='icon' 
                style={{
                    color:'crimson',
                    backgroundColor:'rgba(255,0,0,0.2)'
                }}/>
            }
            break;
        case 'order':
            data = {
                title: "ORDERS",
                isMoney: false,
                link: 'view all orders',
                icon: <ShoppingCartOutlinedIcon className='icon' 
                style={{
                    color:'goldenrod',
                    backgroundColor:'rgba(218,165,32,0.2)'
                }}
                />
            }
            break;
        case 'earnings':
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: 'view net earnings',
                icon: <MonetizationOnOutlinedIcon className='icon'
                style={{
                    color:'green',
                    backgroundColor:'rgba(0,128,0,0.2)'
                }}
                />
            }
            break;
        case 'balance':
            data = {
                title: "BALANCE",
                isMoney: true,
                link: 'see details',
                icon: <AccountBalanceWalletOutlinedIcon className='icon' 
                style={{
                    color:'purple',
                    backgroundColor:'rgba(128,0,128,0.2)'
                }}
                />
            }
            break;
        default:
            break;
    }


    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && '₹'} {amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff}%
                </div>
                {data.icon}

            </div>
        </div>
    );
}

export default Widget;