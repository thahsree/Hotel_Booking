import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import useFetch from '../../hooks/useFetch';
import './newHotel.css';
function NewRoom({ input, title }) {

    const [files, setFiles] = useState('');
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState()

    const { data, loading, error, reFetch } = useFetch(`http://localhost:8080/api/rooms`);

    const handleChange = e => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    console.log(data);
    const handleSelect = (e) => {

        const value = Array.from(e.target.selectedOptions, (options) => options.value)
        setRooms(value)
    }

    console.log(files);
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const list = await Promise.all(
                Object.values(files).map(async(file) => {
                    const data = new FormData()
                    data.append("file", file)
                    data.append("upload_preset", "upload")

                    const upload = await axios.post('https://api.cloudinary.com/v1_1/db17ho8ub/image/upload', data)

                    const { url } = upload.data
                    return url
                })
            )

            const newHotel = {
                ...info,
                rooms,
                photos:list
            }

            console.log(newHotel);
            await axios.post("http://localhost:8080/api/hotels",newHotel,{
                withCredentials: true // Add this option to include cookies
            })
            
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
                                files ? URL.createObjectURL(files[0]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
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
                                <input id='file'
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    type="file"
                                    style={{ display: 'none' }} />
                            </div>
                            {
                                input.map((item) => (
                                    <div className="formInput" key={item.id}>
                                        <label >{item.label}</label>
                                        <input id={item.id}
                                            onChange={handleChange}
                                            autoComplete='off'
                                            type={item.type}
                                            placeholder={item.placeholder} />
                                    </div>
                                ))
                            }
                            <div className="formInput" >
                                <label >Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms" >
                                <label >Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {
                                        loading ? "loading" : data &&
                                            data?.map((room) => (
                                                <option key={room._id} value={room._id}>{room.title}</option>
                                            ))
                                    }
                                </select>
                            </div>


                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewRoom;