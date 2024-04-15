import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './new.css';

function New({ input, title }) {

    const [file , setFile] = useState('');
    const [info , setInfo] = useState({})

    const handleChange = e=>{
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick=async(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset","upload")

        try {
            const upload = await axios.post('https://api.cloudinary.com/v1_1/db17ho8ub/image/upload',data)

            const {url} = upload.data
            const newUser = {
                ...info,
                img:url
            }
            await axios.post('http://localhost:8080/api/auth/register',newUser);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file ? URL.createObjectURL(file) : 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                            }
                            alt="profile_pic"
                            className='img'
                        />
                    </div>
                    <div className="right">
                        <form action="">
                            <div className="formInput">
                                <label htmlFor="file" >
                                    Image: <DriveFolderUploadOutlinedIcon className='icon' />
                                </label>
                                <input id='file' onChange={(e)=> setFile(e.target.files[0])} type="file" style={{ display: 'none' }} />
                            </div>
                            {
                                input.map((item) => (
                                    <div className="formInput" key={item.id}>
                                        <label >{item.label}</label>
                                        <input onChange={handleChange} autoComplete='off' type={item.type} placeholder={item.placeholder} id={item.id} />
                                    </div>
                                ))
                            }


                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default New;