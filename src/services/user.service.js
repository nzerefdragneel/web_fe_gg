import axios from 'axios';

const API_URL = 'https://web-api-be.onrender.com/api/test/';

class UserService {
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