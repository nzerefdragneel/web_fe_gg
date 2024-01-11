import axios from "axios";
import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/notification/`;
class NotificationService {
  createBatchNotification(
    title,
    content,
    classId,
    userId,
    listReceiverId,
    assignmentId
  ) {
    return axios.post(
      API_URL + `createBatch`,
      {
        title: title,
        content: content,
        classId: classId,
        userId: userId,
        listReceiverId: listReceiverId,
        assignmentId: assignmentId,
      },
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }

  createNotification(
    title,
    content,
    classId,
    userId,
    receiverId,
    assignmentId
  ) {
    return axios.post(
      API_URL + `create`,
      {
        title: title,
        content: content,
        classId: classId,
        userId: userId,
        receiverId: receiverId,
        assignmentId: assignmentId,
      },
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }
}

export default new NotificationService();
