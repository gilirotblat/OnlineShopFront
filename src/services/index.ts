import axios, { Axios } from 'axios'


export const httpClient = new Axios({
    baseURL: "http://127.0.0.1:8080/api/v1",
    headers: {
        'Content-Type': 'application/json'
    }
})



httpClient.interceptors.request.use((request) => { 
    const token = localStorage.getItem('token')
    if(token) {
        request.headers.Authorization = 'Bearer ' + token
    }
    return request
})


httpClient.interceptors.response.use((response) => { 
    if(response.data) {
        response.data = JSON.parse(response.data)
    }
    return response
})


