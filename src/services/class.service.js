import axios from "axios";
import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/classes/`;
class ClassService {
    getbyid(id) {
        return axios.get(API_URL + `getbyid?id=${id}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    checkteacher(classid, userId) {
        return axios.get(
            API_URL + `istecher?classId=${classid}&userId=${userId}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }

    getlistteachers(id) {
        return axios.get(API_URL + `getteacherinclass?id=${id}`, {
            headers: headers,
            mode: "no-cors",
        });
    }

    getliststudents(id) {
        return axios.get(API_URL + `getstudentinclass?id=${id}`, {
            headers: headers,
            mode: "no-cors",
        });
    }

    addStudents(classId, students) {
        return axios.post(
            API_URL + `addStudents`,
            {
                classId: classId,
                students: students,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
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
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    createClass(className, description, teacherId) {
        return axios.post(
            API_URL + `create`,
            {
                className: className,
                description: description,
                teacherId: teacherId,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getAllClasses(userId) {
        return axios.get(API_URL + `getall?id=${userId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    getAllClassesAdmin(page,limit,asc){
        return axios.get(API_URL + `getall?page=${page}&size=${limit}&asc=${asc}`, 
        {
            headers: headers,
            mode: "no-cors",
        }
      )};

    getClassByTeacherId(userId) {
        return axios.get(API_URL + `getbyteacherid?id=${userId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    getClassByStudentId(userId) {
        return axios.get(API_URL + `getbystudentid?id=${userId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    getivitelinkstudent(classId) {
        return axios.get(
            API_URL + `getlink?classId=${classId}&isTeacher=${false}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getAllAssignment(classId) {
        return axios.get(API_URL + `getassignments?id=${classId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    getivitelinkteacher(classId) {
        return axios.get(
            API_URL + `getlink?classId=${classId}&isTeacher=${true}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getinvitestudent(id, email) {
        return axios.get(
            API_URL + `invitestudent?classId=${id}&studentEmail=${email}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getinviteteacher(id, email) {
        return axios.get(
            API_URL + `inviteemailteacher?classId=${id}&teacherEmail=${email}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    checkmssv(classId, mssv) {
        return axios.get(
            API_URL + `checkmssv?classId=${classId}&mssv=${mssv}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    checkhavemssv(classId, userId) {
        return axios.get(
            API_URL + `checkhavemssv?classId=${classId}&userId=${userId}`,
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    updatemssv(classId, studentId, mssv) {
        return axios.post(
            API_URL + "updatestudentid",
            {
                data: {
                    classId: classId,
                    studentId: studentId,
                    mssv: mssv,
                },
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getScorings(classId) {
        return axios.get(API_URL + `getscorings?id=${classId}`, {
            headers: headers,
        });
    }
    async updateactive(classId,active){
        return await axios.post(API_URL+'updateactive',{
          data:{
            id:classId,
            active:active
          }
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
    async getclassactive(id){
      return await axios.get(API_URL+`getactive?id=${id}`,
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
    async getAllStudentAdmin(classId,page,limit,asc){
      return await axios.get(API_URL + `getallstudentinclass?classId=${classId}&page=${page}&size=${limit}&asc=${asc}`,
      {
        headers: headers,
        mode: "no-cors",
    }
    )}
    async importStudentIdAdmin(classId,students){
        return await axios.post(API_URL + `importbatchstudentid`,{
            data:{
                classId:classId,
                students:students
            }
            },
            {
            headers: headers,
            mode: "no-cors",
        })}
        getAllClassesSearch(page,limit,asc,search){
            return axios.get(API_URL + `filterclass?page=${page}&size=${limit}&asc=${asc}&className=${search}`, {
              headers: {
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Access-Control-Allow-Origin": "*",
              },
              mode: "no-cors",
          }
          )};

}


export default new ClassService();
