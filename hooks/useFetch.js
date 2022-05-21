

import axios from 'axios'
import { setRows } from '../redux/rowsSlice';
import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
function useFetch(url,dependencyArray){
    const dispatch = useDispatch()
    const[data, setData] = useState(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    
    useEffect(()=>{
        setLoading(true);
        axios.get(url).then((response) => {
            setData(response.data);
            dispatch(setRows(response.data));

        }).catch((err)=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        });
    },[url,...dependencyArray]);

    return {data, loading, error};
}

export default useFetch