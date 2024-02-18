import { weekClient } from "./client";

const getAllWeekData = () => weekClient.get("/getAllWeekData");
const getWeekByName = (weekName) => weekClient.get("/getWeekByName",{params: {weekName}})
const addWeek = (body) => weekClient.post("/addWeek",body)
const updateWeekUserData = (body) => weekClient.post("/updateWeekUserData",body)
const updateWeekData = (body,oldWeekName) => weekClient.post("/updateWeekData",body,{params: {oldWeekName}})
const deleteWeekData = (weekName) => weekClient.delete("/deleteWeek",{params: {weekName}})

export default{
    getAllWeekData,
    getWeekByName,
    addWeek,
    updateWeekUserData,
    updateWeekData,
    deleteWeekData
}