import axios from "axios";
import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/grade/`;
class GradeService {
    create(classId, scale, position, name, teacherId) {
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
}

export default new GradeService();
