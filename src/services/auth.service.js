import axios from "axios";
const bcrypt = require("bcryptjs");

// const API_URL = "https://web-api-be.onrender.com/api/auth/";

const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      },

        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          mode: 'no-cors',
        }
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
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'no-cors',
      }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  facebookLogin() {
    return axios.get(API_URL + "facebook",
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'no-cors',
      }).then((res) => console.log(res))
  }

  googleLogin() {
    return axios.get(API_URL + "google",
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'no-cors',
      }).then((res) => console.log(res))
  }
}

export default new AuthService();
