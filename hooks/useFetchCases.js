import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export const useFetchCases = (url) => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setrefresh] = useState(false);

    const {logout} = useAuth()
    const getCases = async () => {
        try{
            const cases = await axios.get(url);
            setData(cases.data);
            setIsLoading(false);            
            return cases

        }catch(err){
            if(err.response.status === 403){
                logout();
            }
            return err.message

        }
    }
    const onRefresh = async () => {
        setrefresh(true);
        await getCases();
        setrefresh(false);

    }
    useEffect(() => {
        getCases()
    },[refresh])

    return {getCases, data, isLoading, refresh, onRefresh}
    
}