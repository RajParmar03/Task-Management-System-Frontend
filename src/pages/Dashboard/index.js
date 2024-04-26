import React, { useState, useEffect } from 'react';
import './index.css';

import { deleteTask, filterArr, getAllTask, getColorByStatus, getPriorityColor, sortArr } from "../../utils/tasks.utils";
import Add from '../../components/Add';
import Edit from '../../components/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/tasks/tasks.action';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);



  const dispatch = useDispatch();
  const taskList = useSelector(store => store.taskManager);

  const navigate = useNavigate();


  useEffect(() => {
    (async function () {
      let response = await getAllTask();
      dispatch(addTask(response));
      setTasks(response);
    })();
  }, []);

  const sortByPriority = async(typeOfSort) => {
    let newtaskList = await sortArr(typeOfSort, taskList);
    dispatch(addTask(newtaskList));
  };


  const filterByStatus = async (status) => {
    let newtaskList = await filterArr(status);
    dispatch(addTask(newtaskList));
  };

  const handleAdd = (task) => {
    setIsAdding(true);
  }

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  }

  const handleDelete = async (id) => {
    await deleteTask(id);
    let response = await getAllTask();
    dispatch(addTask(response));
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }

  const renderTableRows = () => {
    return taskList.map((task, index) => (
      <tr key={task._id}>
        <td>{index + 1}</td>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td style={{ color: getColorByStatus(task.status) , fontWeight:"bold"}}>{task.status}</td>
        <td style={{ color: getPriorityColor(task.priority), fontWeight:"bold" }}>{task.priority}</td>
        <td><button onClick={() => handleEdit(task)}>Edit</button></td>
        <td><button className='delete-button' onClick={() => handleDelete(task._id)}>Delete</button></td>
      </tr>
    ));
  };

  return (
    <>

      {!isAdding && !isEditing && (
        <div className="dashboard-container">
          <h2>Dashboard</h2>
          <div className="dashboard-controls">
            <select onChange={(e) => sortByPriority(e.target.value)}>
              <option value="">Sort by priority</option>
              <option value="HTL">High to Low</option>
              <option value="LTH">Low to High</option>
            </select>
            <select onChange={(e) => filterByStatus(e.target.value)}>
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => handleAdd()}>Add Task</button>
            <button className='logout-button' onClick={() => handleLogout()}>Logout</button>
          </div>
          <table className="task-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Edit Task</th>
                <th>Delete Task</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          setIsEditing={setIsEditing}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default Dashboard;
