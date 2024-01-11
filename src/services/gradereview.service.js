import axios from "axios";
import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/gradereview/`;
class GradeReviewService {
  createGradeReviewRequest(
    studentId,
    assignmentId,
    classId,
    currentGrade,
    expectationGrade,
    studentExplanation
  ) {
    return axios.post(
      API_URL + `create`,
      {
        studentId: studentId,
        assignmentId: assignmentId,
        classId: classId,
        currentGrade: currentGrade,
        expectationGrade: expectationGrade,
        studentExplanation: studentExplanation ?? "",
      },
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }

  getGradeReviewRequestByStudentIdAndClassId(studentId, classId) {
    return axios.get(
      API_URL +
        `getGradeReviewByStudentIdAndClassId?studentId=${studentId}&classId=${classId}`,
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }

  getGradeReviewRequestByClassId(classId) {
    return axios.get(API_URL + `getGradeReviewByClassId?classId=${classId}`, {
      headers: headers,
      mode: "no-cors",
    });
  }

  getGradeReviewRequestByStudentIdAndAssignmentId(studentId, assignmentId) {
    return axios.get(
      API_URL +
        `getGradeReviewByStudentIdAndAssignmentId?studentId=${studentId}&assignmentId=${assignmentId}`,
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }

  updateAcceptedGradeReview(reviewId, decision) {
    return axios.post(
      API_URL + `updateAcceptedGradeReview`,
      {
        id: reviewId,
        final_decision: decision,
      },
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }
}

export default new GradeReviewService();
