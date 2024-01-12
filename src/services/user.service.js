import axios from "axios";
import headers from "../common/header";

// // const API_URL = "https://web-api-be.onrender.com/api/auth/";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/auth/`;
const API_TEST = `${process.env.REACT_APP_SERVICE_URL}/api/test/`;

// const API_URL = "http://localhost:8080/api/auth/";

class UserService {
    getRoles(id) {
        return axios.get(`${API_TEST}getroles?id=${id}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    EditUser(userId, fullname, username, email, password) {
        return axios.put(
            API_TEST + "edituser",
            {
                userId,
                fullname,
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
    EditUserManager(userId, username, email, password, fullname, active) {
        return axios.put(
            API_TEST + "edituser",
            {
                userId,
                username,
                email,
                password,
                fullname,
                active,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    GetAll(page, limit) {
        return axios.get(API_TEST + `getalluser?page=${page}&size=${limit}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    async GetbyId(id) {
        return await axios.get(API_TEST + `getbyid?userId=${id}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    async GetStatus(id) {
        return await axios.get(API_TEST + `getstatus?userId=${id}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
}

export default new UserService();
