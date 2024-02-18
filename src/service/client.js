import axios from 'axios'
const authClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL+"/auth"
})
const userClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL+"/user"
})
const weekClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL+"/weeks"
})


export {
    authClient,
    userClient,
    weekClient
}