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
        assignmentId,
        type
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
                type: type,
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
        assignmentId,
        type
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
                type: type,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
    getNotificationByReceiverId(userId) {
        return axios.get(API_URL + `getbyreceiverid?userId=${userId}`, {
            headers: headers,
            mode: "no-cors",
        });
    }
    updatedStatus(id, status) {
        return axios.post(
            API_URL + `updatestatus`,
            {
                notificationId: id,
                status: status,
            },
            {
                headers: headers,
                mode: "no-cors",
            }
        );
    }
}

export default new NotificationService();
