import React, { useEffect, useState } from 'react'

const useData = (url) => {
    const [data, setData]=useState([]);
    const fetchData = async () => {
        const data = await fetch(url)
        const result = await data.json();
        console.log("Result ",result);
        setData(result)
    }
    useEffect(() => {
        fetchData();
    }, []);
    return data;
}

export default useData