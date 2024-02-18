import { userClient } from "./client";

const getUserList = () => userClient.get("/userList")
const getUserByUserName = (username) => userClient.get("/userByUsername",{params: {username: username}})

export default{
    getUserList,
    getUserByUserName
}