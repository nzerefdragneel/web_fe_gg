import axios from 'axios';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    EditUser(userId,username, email, password) {
        return axios.post(API_URL + "edituser", {
          userId,
          username,
          email,
          password
        });
      }
}

export default new UserService();