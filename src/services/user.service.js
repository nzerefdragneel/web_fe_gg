import axios from 'axios';

// // const API_URL = "https://web-api-be.onrender.com/api/auth/";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/auth/`;
const API_TEST=`${process.env.REACT_APP_SERVICE_URL}/api/test/`;

// const API_URL = "http://localhost:8080/api/auth/";

class UserService{
 getRoles(id){
     axios.get(
      `${API_TEST}getroles?id=${id}`,{
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: 'no-cors',
      })
      .then(res=>{
        return res.data.roles
      }).catch( err=> {return ''})
     
  }
    EditUser(userId,username, email, password) {
        return axios.put(API_TEST + "edituser", {
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