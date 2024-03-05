const api_url = `/api`

async function httpReqData() {
    const res = await fetch(`${api_url}/`)
    const fetchedData = await res.json();
    return fetchedData;
}

async function httpReqDataByid(id) {
    const res = await fetch(`${api_url}/blog/${id}`)
    const fetchedData = await res.json();
    return fetchedData;
}
async function httpGetUserData() {
    const res = await fetch(`${api_url}/user`)
    const fetchedData = await res.json();
    return fetchedData;
}


export default {
    httpReqData,
    httpReqDataByid,
    httpGetUserData
}