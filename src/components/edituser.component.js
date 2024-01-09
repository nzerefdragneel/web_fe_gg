import React, { useState, useRef, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import { ToastContainer, toast } from "react-toastify";
import UserService from "../services/user.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                This field is required!
            </div>
        );
    }
};

const vemail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="text-error-color text-base" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="text-error-color text-base" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="text-error-color text-base" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const confirmPass = (value) => {
    if (value !== document.getElementById("password").value) {
        return (
            <div className="text-error-color text-base" role="alert">
                Password is not match!
            </div>
        );
    }
};

const EditUser = () => {
    const navigate = useNavigate();
    const fref = useRef(null);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [loadData, setLoadData] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const notifyUpdateSusscess = () => toast.success("Update Profile Success!");
    const notifyUpdateFail = () => toast.error("Update Profile Fail!");

    useEffect(() => {
        setLoadData(true);
        const fetchData = async () => {
            if (user == null) {
                setLoadData(false);
                return;
            }
            try {
                const response = await UserService.GetbyId(user?.id);
                setProfile(response?.data.user);
            } catch (error) {
                console.log(error);
            }
            setLoadData(false);
        };
        if (user != null) {
            fetchData();
        }
    }, [user?.id]);

    if (user == null) {
        return <Navigate replace to="/" />;
    }

    function handleEdituser(e) {
        e.preventDefault();
        if (fref.current) {
            fref.current.validateAll();
        }

        if (
            fullName === "" ||
            password === "" ||
            email === "" ||
            username === "" ||
            repeatPassword === ""
        ) {
            notifyUpdateFail();
            setMessage("Missing some field!");
            setIsLoading(false);
            return;
        }

        if (
            vusername(username) ||
            vemail(email) ||
            vpassword(password) ||
            confirmPass(repeatPassword)
        ) {
            notifyUpdateFail();
            setMessage("Invalid field!");
            setIsLoading(false);
            return;
        }

        UserService.EditUser(
            profile?.id,
            fullName,
            username,
            email,
            password
        ).then(
            (response) => {
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(response.data));
                notifyUpdateSusscess();
                setMessage("Edit User Success");
                setIsLoading(false);
                setTimeout(() => {
                    navigate(`/profile`);
                }, 1000);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                notifyUpdateFail();
                setMessage(resMessage);
                setIsLoading(false);
            }
        );
    }

    return (
        <>
            <div className="flex flex-col mx-20 my-3">
                <div className=" mx-auto mt-2">
                    {loadData && (
                        <span className="spinner-border spinner-border-lg text-dark-green"></span>
                    )}
                </div>
                {!loadData && (
                    <>
                        <div className=" mt-3 ml-2 text-2xl text-dark-green font-bold">
                            <h2>Edit Your Profile</h2>
                        </div>
                        <div className="my-3 mx-5">
                            <Form onSubmit={handleEdituser} ref={fref}>
                                <div className="form-group">
                                    <label
                                        htmlFor="fullname"
                                        className="font-semibold mb-2"
                                    >
                                        Full Name:
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="fullname"
                                        placeholder={
                                            profile?.fullname ||
                                            "Enter your Full Name"
                                        }
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="username"
                                        className="font-semibold mb-2"
                                    >
                                        Username:
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="username"
                                        placeholder={
                                            profile?.username ||
                                            "Enter your Username"
                                        }
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required, vusername]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="font-semibold mb-2"
                                    >
                                        Email:
                                    </label>
                                    <Input
                                        type="text"
                                        className="form-control p-3 rounded required"
                                        name="email"
                                        placeholder={
                                            profile?.email || "Enter your Email"
                                        }
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required, vemail]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="font-semibold mb-2"
                                    >
                                        New Password:
                                    </label>
                                    <Input
                                        type="password"
                                        className="form-control p-3 rounded required"
                                        name="password"
                                        id="password"
                                        placeholder={"Enter your New Password"}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required, vpassword]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="repeatpassword"
                                        className="font-semibold mb-2"
                                    >
                                        Confirm New Password:
                                    </label>
                                    <Input
                                        type="password"
                                        className="form-control p-3 rounded required"
                                        name="repeatpassword"
                                        placeholder={"Confirm new Password"}
                                        onChange={(e) => {
                                            setRepeatPassword(e.target.value);
                                            setMessage("");
                                        }}
                                        validations={[required, confirmPass]}
                                    />
                                </div>
                                {message && (
                                    <div
                                        className={"alert alert-danger"}
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                                <div className="form-group text-right">
                                    <Link
                                        to={`/profile`}
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
                                        Save
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </>
                )}
                <ToastContainer />
            </div>
        </>
    );
};

export default EditUser;
