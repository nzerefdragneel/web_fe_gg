import axios from 'axios';

const API_URL = 'https://web-api-be.onrender.com/api/test/';

class UserService {
    EditUser(userId,username, email, password) {
        return axios.put(API_URL + "edituser", {
          userId,
          username,
          email,
          password
        });
      }
}

export default new UserService();