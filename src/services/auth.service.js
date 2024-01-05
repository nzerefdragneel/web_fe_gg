import axios from "axios";
import headers from "../common/header";

const bcrypt = require("bcryptjs");

// // const API_URL = "https://web-api-be.onrender.com/api/auth/";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/auth/`;

//const API_URL = "http://localhost:8080/api/auth/";
class AuthService {
    login(username, password) {
        return axios.post(
            API_URL + "signin",
            {
                username,
                password,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(
            API_URL + "signup",
            {
                username,
                email,
                password,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }

    forgotPassword(email) {
        return axios.post(
            API_URL + "forgot-password",
            {
                email,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }

    resetPassword(email, token, password) {
        return axios.post(
            API_URL + "reset-password",
            {
                email,
                token,
                password,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    facebookLogin() {
        return axios
            .get(API_URL + "facebook", {
                headers: headers,
                mode: "no-cors",
            })
            .then((res) => console.log(res));
    }

    googleLogin() {
        return axios
            .get(API_URL + "google", {
                headers: headers,
                mode: "no-cors",
            })
            .then((res) => console.log(res));
    }
}

export default new AuthService();
