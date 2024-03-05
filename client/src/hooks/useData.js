import { useCallback, useEffect, useState } from 'react'
import request from './requestData'

function useData() {
    const [data, setData] = useState([])

    const getData = useCallback(async () => {
        const fetchedData = await request.httpReqData();
        setData(fetchedData);
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return data;
}

export default useData;