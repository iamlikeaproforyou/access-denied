import { useCallback, useEffect, useState } from 'react'
import request from './requestData'

function useUserData() {
    const [data, setData] = useState({})

    const getData = useCallback(async () => {
        const fetchedData = await request.httpGetUserData();
        setData(fetchedData);
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return data;
}

export default useUserData;