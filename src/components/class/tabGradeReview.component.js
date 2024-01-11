import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import {
  PlusIcon,
  ChevronDoubleRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gradeService from "../../services/grade.service";
import ReviewRequest from "./reviewRequest.component";
import gradereviewService from "../../services/gradereview.service";
import { list } from "postcss";
import classService from "../../services/class.service";
import assert from "assert";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        This field is required!
      </div>
    );
  }
};

export function TabGradeReview({ id }) {
  const [listAssignments, setlistAssignments] = useState([]);
  const [listGrade, setListGrade] = useState([]);
  const [listStudents, setListStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [listGradeReview, setListGradeReview] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await gradeService.getGradeByClassId(id);
        setlistAssignments(res?.data?.data);
        setMessage("");
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const res = await gradereviewService.getGradeReviewRequestByClassId(id);
        setListGradeReview(res?.data?.data);
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const res = await classService.getliststudents(id);
        setListStudents(res?.data?.data);
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, userId]);

  return (
    <div className=" ">
      <div className="grid grid-flow-row-dense gap-2 mx-40 my-4">
        {loading && (
          <div className="place-items-center mx-auto col-span-2">
            <span className="spinner-border spinner-border-lg text-dark-green"></span>
          </div>
        )}
        {!loading && listGradeReview.length === 0 && (
          <div className="text-gray-900 text-center">
            No grade review request found.
          </div>
        )}
        {!loading &&
          listGradeReview?.length !== 0 &&
          listGradeReview.map((value) => (
            <div className="flex flex-col  p-2 justify-end shadow-md w-full bg-slate-50 rounded my-2">
              <Card className="h-auto shadow-none  bg-slate-50">
                <CardBody className="grid grid-cols-2 place-items-center -mt-5 p-3">
                  <Typography variant="paragraph" className="italic my-0">
                    Student:
                    <Link
                      className=" text-gray-900  hover:text-dark-green"
                      to={`/class/gradereview/details?classId=${id}&assignmentId=${value.assignmentId}&studentId=${value.studentId}`}
                    >
                      <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                        {
                          listStudents?.find(
                            (student) => student.studentId === value.studentId
                          ).mssv
                        }
                      </div>
                    </Link>
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="italic text-gray-900 my-0 mr-0"
                  >
                    Assignment:
                    <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                      {
                        listAssignments?.find(
                          (assignment) =>
                            assignment.assignmentId === value.assignmentId
                        ).name
                      }
                    </div>
                  </Typography>
                </CardBody>
              </Card>
            </div>
          ))}
        {message && <div className="text-red-500 text-center">{message}</div>}
      </div>
      <ToastContainer />
    </div>
  );
}
