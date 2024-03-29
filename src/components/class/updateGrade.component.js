import React, { useRef } from "react";
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

const UpdateGrade = ({
  student,
  prevGrade,
  handleClose,
  assignmentId,
  classId,
  notifyUpdateSusscess,
  notifyUpdateFail,
}) => {
  const fref = useRef(null);
  const [grade, setGrade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        if (grade === "") {
          notifyUpdateFail();
          setMessage("Grade is required");
          setIsLoading(false);
          return;
        }
        if (grade > 10 || grade < 0) {
          notifyUpdateFail();
          setMessage("Grade must be between 0 and 10");
          setIsLoading(false);
          return;
        }
        gradeService
          .updateGradeOfStudent(
            assignmentId,
            student.mssv,
            grade,
            classId,
            teacherId
          )
          .then(
            (res) => {
              if (res.status === 201) {
                notifyUpdateSusscess();
                setIsLoading(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            },
            (error) => {
              setIsSubmit(true);
              notifyUpdateFail();
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
            Update Grade
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
                    value={student.mssv}
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
                    placeholder={prevGrade}
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
                    className="w-32 py-2.5 text-white bg-error-color rounded-lg text-base mt-3 mr-3"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-32 py-2.5 text-white bg-dark-green rounded-lg text-base mt-3"
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
