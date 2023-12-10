import axios from "axios";


const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/classes/`;
class ClassService {
    getbyid(id) {
       return axios
            .get(
                API_URL + `getbyid?id=${id}`,
                {
                    headers: {
                        "Cache-Control": "no-cache",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Access-Control-Allow-Origin": "*",
                    },
                    mode: "no-cors",
                }
                 
            )
           
    };
    getlistteachers(id){
        console.log(id)
        return  axios
        .get(
            API_URL + `getteacherinclass?id=${id}`,
            {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                },
                mode: "no-cors",
            }
             
        )
    };
    getliststudents(id){
        console.log(id)
        return  axios
        .get(
            API_URL + `getstudentinclass?id=${id}`,
            {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                },
                mode: "no-cors",
            }
             
        )
    };
    createClass(className, description, teacherId){
        return axios
        .post(
            API_URL + `create`,
            {
                className: className, 
                description: description, 
                teacherId: teacherId
            },
            {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                },
                mode: "no-cors",
            }
             
        )
    }
  }
  

export default new ClassService();
