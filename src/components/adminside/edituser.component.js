import React, { Component } from "react";
import UserService from "../../services/user.service";
import { Link } from "react-router-dom";
import userService from "../../services/user.service";
export default class EditUserManager extends Component {
    constructor(props) {
        super(props);
        this.handleEdituser = this.handleEdituser.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
        const queryParameters = new URLSearchParams(window.location.search);
        const userId = queryParameters.get("id");

        userService
            .GetbyId(userId)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    userId: response.data.user.id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    fullname: response.data.user.fullname,
                    active: response.data.user.active,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        this.state = {
            password: "",
            successful: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }
    onChangeFullname(e) {
        this.setState({
            fullname: e.target.value,
        });
    }
    onChangeActive(e) {
        this.setState({
            active: e.target.value,
        });
    }

    handleEdituser(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false,
        });

        UserService.EditUserManager(
            this.state.userId,
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.fullname,
            this.state.active
        ).then(
            (response) => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                });
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage,
                });
            }
        );
    }

    render() {
        return (
            <div className=" px-5 py-2 my-5 mx-16">
                <div className="flex flex-col  w-full">
                    <div className="pt-3 pb-4 px-32 flex flex-row justify-between">
                        <div className="flex flex-row text-lg">
                            <h2>Edit User Profile</h2>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={this.handleEdituser}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                        <>
                            <div className="flex flex-col  w-full ">
                                <div className="border-b border-gray-900/10">
                                    <h1 className="text-base font-semibold leading-7 text-gray-900">
                                        Edit user Profile
                                    </h1>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="username"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="username"
                                                    readOnly="true"
                                                    autoComplete="username"
                                                    value={this.state.username}
                                                    onChange={
                                                        this.onChangeUsername
                                                    }
                                                    placeholder="username"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={this.state.email}
                                                    onChange={
                                                        this.onChangeEmail
                                                    }
                                                    placeholder="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="fullname"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Fullname
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="fullname"
                                                    name="fullname"
                                                    type="fullname"
                                                    autoComplete="fullname"
                                                    value={this.state.fullname}
                                                    onChange={
                                                        this.onChangeFullname
                                                    }
                                                    placeholder="fullname"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="password"
                                                    placeholder="password"
                                                    value={this.state.password}
                                                    onChange={
                                                        this.onChangePassword
                                                    }
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <select
                                            id="active"
                                            onChange={this.onChangeActive}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value={this.state.active}>
                                                {this.state.active === true
                                                    ? "Active"
                                                    : "Inactive"}
                                            </option>
                                            {this.state.active === false ? (
                                                <option value={true}>
                                                    Active
                                                </option>
                                            ) : (
                                                <option value={false}>
                                                    Inactive
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link
                                    to={"/manageruser"}
                                    className=" text-gray-900 hover:none"
                                >
                                    <button className="rounded-md text-gray-900 bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    )}
                    {this.state.message && (
                        <div className="form-group">
                            <div
                                className={
                                    this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {this.state.message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
