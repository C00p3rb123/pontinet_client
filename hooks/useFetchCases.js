import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchCases = (url) => {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const getCases = async () => {
        try{
            const cases = await axios.get(url);
            setData(cases.data);
            setIsLoading(false);
            return cases

        }catch(err){
            setIsLoading(false);
            return err.message

        }
    }
    useEffect(() => {
        getCases()
    },[])
    return {getCases, data, isLoading}
    
}