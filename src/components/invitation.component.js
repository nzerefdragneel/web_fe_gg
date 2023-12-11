import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import classService from "../services/class.service";

export default function Invitation() {
  let params = new URL(window.location).searchParams;
  const classId = params.get("id");
  const isTeacher = params.get("isTeacher");

  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate(
        `/login?invitationId=${
          classId !== null ? classId.toString() : "null"
        }&isTeacher=${isTeacher !== null ? isTeacher.toString() : "null"}`
      );
    } else {
      const userId = JSON.parse(user).id;
      classService.acceptInvitation(classId, isTeacher, userId).then(
        (response) => {
          if (response.status === 200) {
            console.log("success");
            navigate(`/home`);
          } else {
            navigate(
              `/login?invitationId=${
                classId !== null ? classId.toString() : "null"
              }&isTeacher=${isTeacher !== null ? isTeacher.toString() : "null"}`
            );
          }
        },
        (error) => {
          navigate(
            `/login?invitationId=${
              classId !== null ? classId.toString() : "null"
            }&isTeacher=${isTeacher !== null ? isTeacher.toString() : "null"}`
          );
        }
      );
    }
  }, [classId, isTeacher, user]);

  return (
    <>
      <div className=" "></div>
    </>
  );
}
