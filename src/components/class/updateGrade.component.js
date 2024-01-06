import React, { useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { tab } from "@material-tailwind/react";
import {} from "@heroicons/react/24/solid";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useState } from "react";
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

const checkPoint = (value) => {
  if (value < 0) {
    return (
      <div className="text-error-color text-base" role="alert">
        Points must be greater than 0!
      </div>
    );
  }
  if (value > 10) {
    return (
      <div className="text-error-color text-base" role="alert">
        Points must be less than 10!
      </div>
    );
  }
};

const UpdateGrade = (student, prevGrade, handleOpen, assignmentId, classId) => {
  const fref = useRef(null);
  const [grade, setGrade] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const teacherId = JSON.parse(localStorage.getItem("user")).id;

  function handleSubmit(e) {
    e.preventDefault();
    if (fref.current) {
      fref.current.validateAll();
    }
    async function updateGrade() {
      try {
        gradeService
          .updateGradeOfStudent(
            student.assignmentId,
            student.student.mssv,
            grade,
            student.classId,
            teacherId
          )
          .then(
            (res) => {
              if (res.status === 201) {
                alert("Upload Grade Success");
                setIsLoading(false);
                window.location.reload();
              }
            },
            (error) => {
              setIsSubmit(true);
              alert("Upload Grade Fail");
              console.log(error);
              setIsLoading(false);
              setMessage("Upload Grade Fail");
            }
          );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    updateGrade();
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
                  <label htmlFor="classname" className="font-semibold mb-2">
                    Student ID
                  </label>
                  <Input
                    type="text"
                    className="form-control p-3 rounded required"
                    name="classname"
                    readOnly={true}
                    value={student.student.mssv}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="font-semibold mb-2 mt-2">
                    Grade
                  </label>
                  <Input
                    type="text"
                    className="form-control p-3 rounded"
                    name="email"
                    placeholder={student.prevGrade}
                    onChange={(e) => {
                      setGrade(e.target.value);
                    }}
                    validations={[required, checkPoint]}
                  />
                </div>
                {isSubmit && (
                  <div className="text-error-color text-base italic">
                    {message}
                  </div>
                )}
                <div className="form-group text-right">
                  <button
                    className="w-48 py-2.5 text-white bg-dark-green rounded-lg text-base mt-3"
                    onClick={() => {
                      setIsLoading(true);
                    }}
                  >
                    {isLoading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Upload
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateGrade;
