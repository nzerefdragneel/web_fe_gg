import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import classService from "../services/class.service";

export default class Invitation extends Component {
  render() {
    let params = new URL(window.location).searchParams;
    const classId = params.get("id");
    const isTeacher = params.get("isTeacher");
    console.log(classId, isTeacher);

    const user = localStorage.getItem("user");
    if (user == null) {
      return (
        <Navigate
          replace
          to={`/login?invitationId=${
            classId !== null ? classId.toString() : "null"
          }&isTeacher=${isTeacher !== null ? isTeacher.toString() : "null"}`}
        />
      );
    } else {
      const userId = JSON.parse(user).id;
      classService.acceptInvitation(classId, isTeacher, userId).then(
        (response) => {
          console.log(response);
          if (response.data.status === "success") {
            return <Navigate replace to="/home" />;
          } else {
            return (
              <Navigate
                replace
                to={`/login?invitationId=${
                  classId !== null ? classId.toString() : "null"
                }&isTeacher=${
                  isTeacher !== null ? isTeacher.toString() : "null"
                }`}
              />
            );
          }
        },
        (error) => {
          console.log(error);
          return (
            <Navigate
              replace
              to={`/login?invitationId=${
                classId !== null ? classId.toString() : "null"
              }&isTeacher=${
                isTeacher !== null ? isTeacher.toString() : "null"
              }`}
            />
          );
        }
      );
    }

    return (
      <>
        <div className=" "></div>
      </>
    );
  }
}
