import DataTable from '../../components/datatable/DataTable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './list.css';




function List({columns}) {
    return (
        <div className='list'>
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <DataTable columns={columns}/>
            </div>
        </div>
    );
}

export default List;