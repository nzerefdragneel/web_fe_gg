import React, { useRef } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {} from "@material-tailwind/react";
import {} from "@heroicons/react/24/solid";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import classService from "../../services/class.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                This field is required!
            </div>
        );
    }
};

const CreateClass = () => {
    const fref = useRef(null);
    const [className, setClassName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
        return <Navigate replace to="/" />;
    }

    const notifyCreateSusscess = () => toast.success("Create Class Success!");
    const notifyCreateFail = () => toast.error("Create Class Fail!");

    function handleSubmit(e) {
        e.preventDefault();
        if (fref.current) {
            fref.current.validateAll();
        }
        if (className === "") {
            setIsLoading(false);
            setIsSubmit(true);
            return;
        }
        classService.createClass(className, description, user.id).then(
            (res) => {
                if (res.status === 200) {
                    notifyCreateSusscess();
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);
                    setIsLoading(false);
                }
            },
            (error) => {
                notifyCreateFail();
                setIsLoading(false);
                setIsSubmit(true);
                setMessage(error.response.data.message);
            }
        );
    }

    return (
        <>
            <div className=" ">
                <div className="flex flex-col justify-end px-4">
                    <div className="text-2xl text-dark-green font-bold mt-3">
                        Create Class
                    </div>
                    <div className="my-3">
                        <Form onSubmit={handleSubmit} ref={fref}>
                            <div>
                                <div className="form-group">
                                    <label
                                        htmlFor="classname"
                                        className="font-semibold mb-2"
                                    >
                                        Class Name
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="classname"
                                        placeholder="Enter your Class Name"
                                        onChange={(e) => {
                                            setClassName(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="font-semibold mb-2 mt-2"
                                    >
                                        Class Description
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded"
                                        name="email"
                                        placeholder="Enter your Class Description"
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required]}
                                    />
                                </div>
                                {isSubmit && (
                                    <div className="text-error-color text-base italic">
                                        {message}
                                    </div>
                                )}
                                <div className="form-group text-right">
                                    <Link
                                        to={`/home`}
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
            </div>
            <ToastContainer />
        </>
    );
};

export default CreateClass;
