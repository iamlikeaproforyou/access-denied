import { useCallback, useEffect, useState } from 'react'
import request from './requestData'

function useDataById(id) {
    const [dataById, setDataById] = useState([])

    const getData = useCallback(async () => {
        const fetchedData = await request.httpReqDataByid(id);
        setDataById(fetchedData);
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return dataById;
}

export default useDataById;