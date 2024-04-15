import axios from 'axios';
import { useEffect, useState } from 'react';


function useFetch(url) {

    const [data , setData] = useState([])
    const [loading ,setLoading]  =useState(false)
    const [err, setErr] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    withCredentials: true // Add this option to include cookies
                })
                setData(response.data)
            } catch (error) {
                setErr(error)
            }
            setLoading(false)
        }

        fetchData()
    },[])

    const reFetch = async()=>{
        setLoading(true);
        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            setErr(error)
        }
        setLoading(false)
    }

    return {data , loading , err , reFetch}
}

export default useFetch;