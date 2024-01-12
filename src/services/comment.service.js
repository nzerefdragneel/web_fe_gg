import axios from "axios";
import headers from "../common/header";

const API_URL = `${process.env.REACT_APP_SERVICE_URL}/api/comment/`;
class CommentService {
  createComment(reviewId, content, userId) {
    return axios.post(
      API_URL + `create`,
      {
        reviewId: reviewId,
        comment: content,
        commenterId: userId,
      },
      {
        headers: headers,
        mode: "no-cors",
      }
    );
  }
}

export default new CommentService();
