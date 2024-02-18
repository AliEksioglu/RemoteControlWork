import { authClient } from "./client";

const login = (body) => authClient.post("/login",body)
const register = (body) => authClient.post("/register",body)
const logOut = (username) => authClient.get("/logOut",{params: {username}})

export default{
    login,
    register,
    logOut
}