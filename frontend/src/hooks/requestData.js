const api_url = `https://localhost:8000`

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

export default {
    httpReqData,
    httpReqDataByid
}