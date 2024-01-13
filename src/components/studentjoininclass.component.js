import React, { useEffect, useRef, useState } from "react";

import { withRouter } from "../common/with-router";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";

import classService from "../services/class.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                This field is required!
            </div>
        );
    }
};

function StudentJoinInClass() {
    const [studentId, setStudentId] = useState("");
    const fref = useRef(null);
    const [message, setMessage] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [classId, setClassId] = useState(0);
    const [userId, setuserId] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const classid = queryParameters.get("classId");
        setClassId(classid);
        const userid = queryParameters.get("userId");
        setuserId(userid);
    }, []);

    const handleForm = (e) => {
        e.preventDefault();

        fref.current.validateAll();
        if (!studentId) {
            return;
        } else {
            localStorage.setItem("StudentId", studentId);
        }

        classService
            .checkmssv(classId, studentId)
            .then((response) => {
                if (response.status === 200) {
                    return classService.updatemssv(classId, userId, studentId);
                } else {
                    const resMessage =
                        (response.data && response.data.message) ||
                        response.message ||
                        response.toString();
                    throw new Error(resMessage);
                }
            })
            .then((res) => {
                navigate(`/class/detail?id=${classId}`);
                window.location.reload();
                setSuccess(true);
                setMessage(res.data.message);
                setIsSubmit(true);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setIsSubmit(true);
            });
    };

    return (
        <div className="col-md-12">
            <div className="mx-4">
                <div className="grid grid-cols-1 md:grid-cols-2   content-around place-items-center mr-3">
                    <div className="flex flex-col flex-wrap">
                        <div className="mr-4 ml-2">
                            <div className="text-3xl text-dark-green font-bold mt-3">
                                Classroom
                            </div>
                            <div className="text-lg mt-3 ml-4">Hi!</div>
                        </div>
                    </div>
                    <div className="bg-gray-50 m-3 p-5">
                        <div className="text-3xl font-bold text-center mb-3">
                            Please type your student id in class
                        </div>
                        <Form onSubmit={handleForm} ref={fref}>
                            <div>
                                <div className="form-group">
                                    <label
                                        htmlFor="studentId"
                                        className="font-semibold mb-2 mt-2"
                                    >
                                        StudentID
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded"
                                        name="studentId"
                                        placeholder="Enter your StudentId"
                                        onChange={(e) => {
                                            setStudentId(e.target.value);
                                        }}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="w-full py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </Form>
                        {isSubmit && !isSuccess && (
                            <div className="text-error-color text-base">
                                {message}
                            </div>
                        )}
                        {isSubmit && isSuccess && (
                            <div className="alert alert-success text-base">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(StudentJoinInClass);
