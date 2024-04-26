import { ADDTASK, GETTASK } from "./tasks.actionType"

export const getTask = () => {
    return {type : GETTASK}
}

export const addTask = (payload) => {
    return {type : ADDTASK, payload : payload}
}