import { ADDTASK, GETTASK } from "./tasks.actionType";


const initialState = [];

export const tasksReducer = (state = initialState , action) => {
    const {type , payload} = action;
    switch(type){
        case ADDTASK : {
            return payload;
        }
        case GETTASK : {
            return state;
        }
        default : {
            return state;
        }
    }
}