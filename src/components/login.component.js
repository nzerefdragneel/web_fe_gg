import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from "../common/with-router";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
        this.setState({ message: "" });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
        this.setState({ message: "" });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        let params = new URL(window.location).searchParams;
        const classId = params.get("invitationId");
        const isTeacher = params.get("isTeacher");
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                (response) => {
                    if (response.data.id) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data)
                        );
                    }
                    if (classId !== null && classId !== "null") {
                        this.props.router.navigate(
                            `/invitation?id=${classId}&isTeacher=${isTeacher}`
                        );
                    } else {
                        this.props.router.navigate("/home");
                    }
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage,
                    });
                }
            );
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        return (
            <div className="col-md-12 ">
                <Form
                    onSubmit={this.handleLogin}
                    ref={(c) => {
                        this.form = c;
                    }}
                    className="w-full"
                >
                    <div className="form-group">
                        <label
                            htmlFor="username"
                            className="font-semibold mb-2"
                        >
                            Username
                        </label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Enter your Username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="password"
                            className="font-semibold mb-2"
                        >
                            Password
                        </label>
                        <Input
                            type={this.state.showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder="Enter your Password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <a
                            href="/forgot-password"
                            style={{ color: "black", fontStyle: "italic" }}
                        >
                            Forgot password?
                        </a>
                    </div>

                    <div className="form-group">
                        <button
                            style={{
                                backgroundColor: "#557C55",
                                borderColor: "#557C55",
                            }}
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}

                    <CheckButton
                        ref={(c) => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
                <div className="flex flex-row justify-center gap-3 mb-3">
                    <a
                        href={`${process.env.REACT_APP_SERVICE_URL}/api/auth/google`}
                    >
                        <div className="rounded-lg bg-neutral-200 flex justify-center items-center p-2 mr-2 hover:cursor-pointer">
                            <img
                                src="/assets/google.svg"
                                className="w-10 h-10"
                                alt="Google"
                            />
                        </div>
                    </a>
                    <a
                        href={`${process.env.REACT_APP_SERVICE_URL}/api/auth/facebook`}
                    >
                        <div className="rounded-lg bg-neutral-200 flex justify-center items-center p-2 hover:cursor-pointer">
                            <img
                                src="/assets/facebook.svg"
                                className="w-10 h-10"
                                alt="Facebook"
                            />
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginForm);
