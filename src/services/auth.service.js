import axios from "axios";
const bcrypt = require("bcryptjs");

const API_URL = "https://web-api-be.onrender.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      },
      {headers:{
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      },}
      )
      .then((response) => {
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
    },
    {headers:{
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },}
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
