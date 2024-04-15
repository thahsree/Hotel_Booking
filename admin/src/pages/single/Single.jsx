import Chart from '../../components/chart/Chart';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Tables from '../../components/table/Table';
import './single.css';

function Single(props) {
    return (
        <div className='single'>
            <Sidebar/>
            <div className="singleContainer">
                <Navbar/>
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className='title'>Information</h1>
                        <div className="item">
                            <img 
                            src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A=" 
                            alt="" 
                            className='itemImg'
                            />

                            <div className="details">
                                <h1 className="itemTitle">Jane Doe</h1>
                                <div className="detailItem">
                                    <span className="itemKey">email:</span>
                                    <span className="itemValue">janedoe@gmail.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">phone:</span>
                                    <span className="itemValue">+91 7235325537</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">address:</span>
                                    <span className="itemValue">doe villa , manipur</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">country:</span>
                                    <span className="itemValue">India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3/1} title="User transactions (last 6 Months)"/>
                    </div>
                </div>
                <div className="bottom">
                <h1 className='title'>Last transactios</h1>
                    <Tables/>
                </div>
            </div>
        </div>
    );
}

export default Single;