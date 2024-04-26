import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Dashboard from '../../pages/Dashboard';
import PrivateRouter from '../PrivateRouter';
import Add from '../Add';
import Edit from '../Edit';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/dashboard' element={<PrivateRouter><Dashboard /></PrivateRouter>}></Route>
      <Route path='/add' element={<PrivateRouter><Add /></PrivateRouter>}></Route>
      <Route path='/edit' element={<PrivateRouter><Edit /></PrivateRouter>}></Route>
    </Routes>
  )
}

export default AllRoutes;