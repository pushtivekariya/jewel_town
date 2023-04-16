import { apiRoutes } from "../constant/api_url";


export function ApiHelperPost(url,data = {}){
    return fetch(apiRoutes.APIHOSTNAME + url, {
        method: "POST",
        body : JSON.stringify(data),
        withCredentials: true,
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        return result;
    },(error) => {
        error = error;
    }
    )
}


export function ApiHelperGet(url) {
    return fetch(apiRoutes.APIHOSTNAME + url,{
        // Return promise
        method: "GET",
        withCredentials: true,
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            return result;
        }, (error) => {
            error = error;
        })
}

export function ApiHelperPostImage(url,data = {}){
    return fetch(apiRoutes.APIHOSTNAME + url, {
        method: "POST",
        body : data,
        withCredentials: true,
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        return result;
    },(error) => {
        error = error;
    }
    )
}

