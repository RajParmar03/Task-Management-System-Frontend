import React, { useEffect, useState } from 'react';

import Login from '../../pages/Login';

const PrivateRouter = (props) => {

    const [token , setToken] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        setToken(token);
    } , []);

    if(!token){
        return <Login />
    }

    return props.children;

}

export default PrivateRouter;