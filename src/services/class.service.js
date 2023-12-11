import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/classes/`;
class ClassService {
  getbyid(id) {
    return axios.get(API_URL + `getbyid?id=${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }
  checkteacher(classid, userId) {
    return axios.get(API_URL + `istecher?classId=${classid}&userId=${userId}`,
     {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }

  getlistteachers(id) {
    return axios.get(API_URL + `getteacherinclass?id=${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }

  getliststudents(id) {
    return axios.get(API_URL + `getstudentinclass?id=${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    });
  }

  //implement
  acceptInvitation(classId, isTeacher, userId) {
    return axios.post(
      API_URL + `acceptInvitation`,
      {
        userId,
        classId,
        isTeacher,
      },
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "no-cors",
      }
    );
  }
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
    };
    getAllClasses(userId){
        return axios
        .get(
            API_URL + `getall?id=${userId}`,
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
    getClassByTeacherId(userId){
        return axios
        .get(
            API_URL + `getbyteacherid?id=${userId}`,
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
    getClassByStudentId(userId){
        return axios
        .get(
            API_URL + `getbystudentid?id=${userId}`,
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
    getivitelinkstudent(classId){
      return axios
      .get(
          API_URL + `getlink?classId=${classId}&isTeacher=${false}`,
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
  getivitelinkteacher(classId){
    return axios
    .get(
        API_URL + `getlink?classId=${classId}&isTeacher=${true}`,
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
  getinvitestudent(id,email){
    return axios
    .get(
        API_URL + `invitestudent?classId=${id}&studentEmail=${email}`,
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
  getinviteteacher(id,email){
    return axios
    .get(
        API_URL + `invitestudent?classId=${id}&studentEmail=${email}`,
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
