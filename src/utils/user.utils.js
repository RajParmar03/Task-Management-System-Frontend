import axios from 'axios';

const base_url = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (user) => {
    try {
        const {name, email, mobile, password} = user;
        const newUser = {name, email, mobile, password}; 
        const response = await axios({
            method: 'post',
            url: `${base_url}/users/registration`,
            data: newUser
        });
        return response;
    } catch (error) {
        console.log('error occured requesting to backend : ', error.message);
        return error;
    }
}

export const loginUser = async (user) => {
    try{
        const response = await axios({
            method: 'post',
            url: `${base_url}/users/login`,
            data: user
        });
        localStorage.setItem('token', response.data.data.token);
        return response.data;
    }catch (error){
        return error.response.data;
    }
}