import axios from "axios";
const bcrypt = require('bcryptjs');

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    const hashedPassword = bcrypt.hashSync(password, 8)
    return axios
      .post(API_URL + "signin", {
        username,
        hashedPassword
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();