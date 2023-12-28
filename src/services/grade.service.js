import axios from "axios";
import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/grade/`;
class GradeService {
    createGrade(classId, scale, position, name, teacherId) {
        return axios.post(
            API_URL + `create`,
            {
                classId: classId,
                scale: scale,
                position: position,
                name: name,
                teacherId: teacherId,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getGradeByClassId(classId) {
        return axios.get(API_URL + `getById?id=${classId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    updatedPostion(gradeId, position) {
        return axios.post(
            API_URL + `updatePosition`,
            {
                gradeId: gradeId,
                position: position,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    deleteGrade(gradeId) {
        return axios.delete(API_URL + `delete?id=${gradeId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    updateNameScale(name, scale, gradeId) {
        return axios.post(
            API_URL + `update`,
            {
                name: name,
                scale: scale,
                gradeId: gradeId,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
}

export default new GradeService();
