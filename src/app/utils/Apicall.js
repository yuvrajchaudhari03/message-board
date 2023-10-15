const ApiCall = async ({
    url,
    method = "GET",
    body,
    withToken = true,
    header = {},
}) => {


    let res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": withToken && process.env.TOKEN || null,
            ...header,
        },
        body: JSON.stringify(body),
    })
    if (res.status === 204) {
        return
    }
    if (res.status === 200 || res.status === 201) {
        return await res.json();
    } else {
        if (res.status === 409 || res.status === 400 || res.status === 404 || res.status === 403) {
            res = await res.json()
            throw { ...res }
        }
    }
};


export default ApiCall;
