import axios from "axios";

const base_url = process.env.REACT_APP_BACKEND_URL;

export const getAllTask = async () => {
    try {
        const token = localStorage.getItem('token');
        const tasksList = await axios({
            method: 'get',
            url: `${base_url}/tasks/`,
            headers: {
                Authorization: token
            }
        });
        return tasksList.data.data.tasks;
    } catch (error) {
        console.log('Error occured while requesting task array...', error.message);
    }
}

export const createTask = async (task) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: 'post',
            url: `${base_url}/tasks/`,
            headers: {
                Authorization: token
            },
            data: task
        });
        return response;
    } catch (error) {
        console.log('Error occured while creating task...', error.message);
    }
}

export const updateTask = async (task, id, userId) => {
    try {
        let newTask = { ...task, userId: userId }
        const token = localStorage.getItem('token');
        const response = await axios({
            method: 'put',
            url: `${base_url}/tasks/${id}`,
            headers: {
                Authorization: token
            },
            data: newTask
        });
        return response;
    } catch (error) {
        console.log('Error occured while updating task...', error.message);
    }
}

export const deleteTask = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios({
            method: 'delete',
            url: `${base_url}/tasks/${id}`,
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        console.log('Error occured while updating task...', error.message);
    }
}

export const sortArr = async (typeOfSort, taskList) => {
    if(typeOfSort === ""){
        let response = await getAllTask();
        return response;
    }
    const newtaskList = [];
    for (let i = 0; i < 3; i++) {
      let curr_type = "";
      if (typeOfSort === "LTH") {
        if (i === 0) {
          curr_type = "low"
        } else if (i === 1) {
          curr_type = "medium"
        } else {
          curr_type = "high"
        }
      } else {
        if (i === 0) {
          curr_type = "high"
        } else if (i === 1) {
          curr_type = "medium"
        } else {
          curr_type = "low"
        }
      }
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].priority === curr_type) {
          newtaskList.push(taskList[j]);
        }
      }
    }
    return newtaskList;
}

export const filterArr = async (status) => {
    let taskList = await getAllTask();
    if(status === ""){
        return taskList;
    }
    let filteredTaskList = taskList.filter((task) => {
        return task.status === status;
    });
    return filteredTaskList;
}

export const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'inherit';
    }
  };

  export const getColorByStatus = (status) => {
    switch (status) {
        case 'pending':
          return 'red';
        case 'in-progress':
          return 'yellow';
        case 'completed':
          return 'green';
        default:
          return 'inherit';
      }
  }