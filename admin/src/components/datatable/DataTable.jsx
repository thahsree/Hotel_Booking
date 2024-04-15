import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './datatable.css';

function DataTable({columns}) {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const { data, loading, error, reFetch } = useFetch(`https://hotel-booking-5hga.onrender.com/api/${path}`);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(data);
    }, [data]);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://hotel-booking-5hga.onrender.com/api/${path}/${id}`, {
                withCredentials: true
            });
            setList(prevList => prevList.filter(item => item._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const actionColumn = [{
        field: 'Action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <Link to='/users/test'>
                        <button className="viewButton">View</button>
                    </Link>
                    <button className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</button>
                </div>
            );
        }
    }];

    const Path = path.charAt(0).toUpperCase() + path.slice(1);

    return (
        <div>
            {loading ? (
                'Loading...'
            ) : (
                <div className='datatable' style={{ height: 700, width: '100%' }}>
                    <div className="dataTableTitle">
                        {Path}
                        <Link to={`/${path}/new`} className='link'>
                            Add New
                        </Link>
                    </div>
                    <DataGrid
                        columns={columns.concat(actionColumn)}
                        rows={list}
                        pageSize={5}
                        checkboxSelection
                        className='datagrid'
                        getRowId={row => row._id}
                    />
                </div>
            )}
        </div>
    );
}

export default DataTable;
