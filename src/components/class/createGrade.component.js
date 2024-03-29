import React, { useRef, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {} from "@material-tailwind/react";
import {} from "@heroicons/react/24/solid";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gradeService from "../../services/grade.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                This field is required!
            </div>
        );
    }
};

const checkScale = (value) => {
    if (value < 0) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be greater than 0!
            </div>
        );
    }
    if (value > 100) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be less than 100!
            </div>
        );
    }
    if (value.includes(".")) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be integer!
            </div>
        );
    }
    if (Number.isInteger(parseInt(value)) === false) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be integer!
            </div>
        );
    }
};

const CreateGrade = () => {
    const fref = useRef(null);
    const [gradeName, setGradeName] = useState("");
    const [scale, setScale] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [classId, setClassId] = useState("");

    const notifyCreateSusscess = () => toast.success("Create Grade Success!");
    const notifyCreateFail = () => toast.error("Create Grade Fail!");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setClassId(params.get("id"));
    }, []);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
        return <Navigate replace to="/" />;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (fref.current) {
            fref.current.validateAll();
        }
        async function addGrade() {
            try {
                const res = await gradeService.getGradeByClassId(classId);
                const listGrade = res.data.data;
                const position = listGrade.length + 1;
                if (
                    Number.isInteger(parseInt(scale)) &&
                    !scale?.includes(".")
                ) {
                    gradeService
                        .createGrade(
                            classId,
                            parseInt(scale),
                            position,
                            gradeName,
                            user.id
                        )
                        .then(
                            (res) => {
                                if (res.status === 201) {
                                    notifyCreateSusscess();
                                    setTimeout(() => {
                                        navigate(
                                            `/class/detail?id=${classId}`,
                                            {
                                                state: {
                                                    activeTab: "assignment",
                                                },
                                            }
                                        );
                                    }, 1000);
                                    setIsLoading(false);
                                }
                            },
                            (error) => {
                                notifyCreateFail();
                                setIsSubmit(true);
                                console.log(error);
                                setIsLoading(false);
                                setMessage("Create Grade Fail");
                            }
                        );
                } else {
                    console.log("scale must be integer");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }
        if (
            scale === "" ||
            gradeName === "" ||
            !Number.isInteger(parseInt(scale)) ||
            scale?.includes(".") ||
            scale < 0 ||
            scale > 100
        ) {
            notifyCreateFail();
            setIsLoading(false);
            return;
        }
        addGrade();
    }

    return (
        <>
            <div className=" ">
                <div className="flex flex-col justify-end px-4">
                    <div className="text-2xl text-dark-green font-bold mt-3">
                        Create Grade
                    </div>
                    <div className="my-3">
                        <Form onSubmit={handleSubmit} ref={fref}>
                            <div>
                                <div className="form-group">
                                    <label
                                        htmlFor="gradename"
                                        className="font-semibold mb-2"
                                    >
                                        Grade Name
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="gradename"
                                        placeholder="Enter your Grade Composition Name"
                                        onChange={(e) => {
                                            setGradeName(e.target.value);
                                        }}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="scale"
                                        className="font-semibold mb-2 mt-2"
                                    >
                                        Grade Scale(%)
                                    </label>
                                    <Input
                                        type="number"
                                        className="form-control p-3 rounded"
                                        name="sc"
                                        placeholder="Enter your Grade Composition Scale"
                                        onChange={(e) => {
                                            setScale(e.target.value);
                                        }}
                                        validations={[required, checkScale]}
                                    />
                                </div>
                                {isSubmit && (
                                    <div className="text-error-color text-base italic">
                                        {message}
                                    </div>
                                )}
                                <div className="form-group text-right">
                                    <Link
                                        to={`/class/detail?id=${classId}`}
                                        state={{ activeTab: "assignment" }}
                                        className=" text-gray-900 hover:no-underline"
                                    >
                                        <button className="w-32 py-2.5 text-white bg-error-color rounded-lg text-base mt-3 mr-3">
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        className="w-32 py-2.5 text-white bg-dark-green rounded-lg text-base mt-3"
                                        onClick={() => {
                                            setIsLoading(true);
                                        }}
                                    >
                                        {isLoading && (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        )}
                                        Create
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default CreateGrade;
