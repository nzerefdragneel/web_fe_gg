import axios from "axios";

import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/gradeStructure/`;

class GradeStructureService {
    getbyclassid(id) {
        return axios.get(API_URL + `getById`, {
            headers: headers,
            mode: "no-cors",
            params: {
                id: id,
            },
        });
    }
}

export default new GradeStructureService();
