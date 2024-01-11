import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import gradeService from "../../services/grade.service";
import classService from "../../services/class.service";
import gradeReviewService from "../../services/gradereview.service";
import commentService from "../../services/comment.service";
import notificationService from "../../services/notification.service";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { ToastContainer, toast } from "react-toastify";

export function DetailReview() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get("classId");
    const assignmentId = queryParams.get("assignmentId");
    const studentId = queryParams.get("studentId");
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const fref = useRef(null);
    const [gradeReview, setGradeReview] = useState({});
    const [assignment, setAssignment] = useState({});
    const [listStudents, setListStudents] = useState([]);
    const [listComments, setListComments] = useState([]);
    const [listTeacher, setListTeacher] = useState([]);
    const [isTeacher, setIsTeacher] = useState(false);
    const [comment, setComment] = useState("");
    const [classData, setClassData] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const notifyCreateSusscess = () => toast.success("Update Request Success!");
    const notifyCreateFail = () => toast.error("Update Request Failed!");

    function handleRequest(option) {
        async function updateRequest() {
            try {
                await gradeReviewService
                    .updateAcceptedGradeReview(gradeReview.reviewId, option)
                    .then(
                        (res) => {
                            if (res.status === 200) {
                                notificationService.createNotification(
                                    "Grade Review Request",
                                    `Your grade review request has been ${option}`,
                                    classId,
                                    userId,
                                    studentId,
                                    assignmentId,
                                    "gradereview"
                                );
                                notifyCreateSusscess();
                                setUpdateLoading(false);
                            } else {
                                notifyCreateFail();
                                setUpdateLoading(false);
                            }
                        },
                        (error) => {
                            notifyCreateFail();
                            setUpdateLoading(false);
                            console.log(error);
                        }
                    );
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }
        updateRequest();
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (fref.current) {
        }
        async function addComment() {
            try {
                if (comment !== "") {
                    await commentService
                        .createComment(gradeReview.reviewId, comment, userId)
                        .then((res) => {
                            if (res.status !== 201) {
                                return;
                            }
                            if (isTeacher) {
                                notificationService.createNotification(
                                    "Teacher Reply",
                                    `Teacher commented on your grade review request`,
                                    classId,
                                    userId,
                                    studentId,
                                    assignmentId,
                                    "gradereview"
                                );
                            } else {
                                notificationService.createBatchNotification(
                                    "Student Reply",
                                    `Student commented on the grade review request`,
                                    classId,
                                    userId,
                                    listTeacher.map(
                                        (teacher) => teacher.teacherId
                                    ),
                                    assignmentId,
                                    "gradereview"
                                );
                            }
                        });

                    setListComments([
                        ...listComments,
                        { commenterId: userId, commentText: comment },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }
        addComment();
    }

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const res = await classService.getbyid(classId);
                setClassData(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            try {
                const res = await gradeService.getSingleAssignment(
                    assignmentId
                );
                setAssignment(res?.data?.data);
            } catch (error) {
                console.error("Error fetching data");
            }
            try {
                const res = await classService.checkteacher(classId, userId);
                setIsTeacher(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            try {
                const res = await classService.getliststudents(classId);
                setListStudents(res?.data?.data);
            } catch (error) {
                console.error("Error fetching data");
            }
            try {
                const res = await classService.getlistteachers(classId);
                setListTeacher(res?.data?.data);
            } catch (error) {
                console.error("Error fetching data");
            }
            try {
                console.log(studentId, assignmentId);
                const res =
                    await gradeReviewService.getGradeReviewRequestByStudentIdAndAssignmentId(
                        studentId,
                        assignmentId
                    );
                setGradeReview(res?.data?.data);
                setListComments(res?.data?.comments);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [assignmentId, classId, studentId, userId]);

    console.log(gradeReview.currentGrade);

    return (
        <div className=" ">
            {loading && (
                <div className=" mx-auto text-center mt-4">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}
            {!loading && (
                <div>
                    <div className="ml-2 mt-1 row flex flex-row items-center">
                        <Link
                            to={`/home`}
                            className="hover:decoration-dark-green"
                        >
                            <div className="text-xl text-dark-green not-italic ">
                                Home
                            </div>
                        </Link>
                        <ChevronRightIcon className="w-5 h-5 mx-2 mt-1" />
                        <Link
                            to={`/class/detail?id=${classId}`}
                            className="hover:decoration-dark-green"
                        >
                            <div className="text-xl text-dark-green not-italic">
                                {classData.className}
                            </div>
                        </Link>
                        <ChevronRightIcon className="w-5 h-5 mx-2 mt-1" />
                        <div className="text-xl  not-italic ">
                            {assignment.name}
                        </div>
                    </div>
                    <hr className=" text-light-green mx-auto w-full" />
                    <div className="row ml-2">
                        <div className="text-xl text-dark-green font-semibold mt-3 px-4">
                            Review for Student:
                            <span className="break-words ml-2 text-2xl font-bold">
                                {listStudents.find(
                                    (x) => x.studentId == studentId
                                )?.studentenrollment?.fullname ?? ""}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-row justify-center gap-x-2">
                        <div className="mt-3 px-4 text-base italic">
                            Current Grade:
                            <span className="text-2xl ml-2 font-semibold text-dark-green not-italic">
                                {gradeReview.currentGrade}
                            </span>
                        </div>
                        <div className="mt-3 px-4 text-base italic">
                            Expectation Grade:
                            <span className="text-2xl ml-2  font-semibold text-error-color not-italic">
                                {gradeReview.expectationGrade}
                            </span>
                        </div>
                    </div>
                    <div className="row mt-2 ml-4 mr-4">
                        <div className="mt-3 px-4 text-lg italic">
                            Student Explanation:
                            <span className="break-words ml-2 text-base not-italic">
                                {gradeReview.studentExplanation}
                            </span>
                        </div>
                    </div>
                    {isTeacher && (
                        <div className="py-4 flex flex-row justify-center gap-x-2">
                            <div className="mt-3 px-4">
                                <button
                                    className="bg-dark-green text-white py-2 px-4 rounded"
                                    onClick={() => {
                                        setUpdateLoading(true);
                                        handleRequest("accepted");
                                    }}
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? (
                                        <span className="spinner-border spinner-border-lg text-dark-green hover:cursor-pointer"></span>
                                    ) : (
                                        "Accept Request"
                                    )}
                                </button>
                            </div>
                            <div className="mt-3 px-4">
                                <button
                                    className="bg-error-color text-white py-2 px-4 rounded hover:cursor-pointer"
                                    onClick={() => {
                                        setUpdateLoading(true);
                                        handleRequest("refused");
                                    }}
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? (
                                        <span className="spinner-border spinner-border-lg text-dark-green"></span>
                                    ) : (
                                        "Refuse Request"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="py-4">
                        <Form onSubmit={handleSubmit} ref={fref}>
                            <div>
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="gradename"
                                        placeholder="Mark your comment"
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div>
                        {listComments.map((comment) => {
                            return (
                                <div className="row">
                                    <div className="mt-3 px-4">
                                        {comment.commenterId === userId
                                            ? "You"
                                            : isTeacher
                                            ? "Student"
                                            : "Teacher"}
                                        : {comment.commentText}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
