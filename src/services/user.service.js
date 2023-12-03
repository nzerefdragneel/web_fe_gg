import axios from 'axios';

// // const API_URL = "https://web-api-be.onrender.com/api/auth/";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/auth/`;

// const API_URL = "http://localhost:8080/api/auth/";

class UserService{
  getRoles(id){
    return axios.get(API_URL + "getroles",
    {
      id
    },
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'no-cors',
      })
  }
    EditUser(userId,username, email, password) {
        return axios.put(API_URL + "edituser", {
          userId,
          username,
          email,
          password
        },
      {headers:{
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      }, mode: 'no-cors',}
      );
      }
}

export default new UserService();