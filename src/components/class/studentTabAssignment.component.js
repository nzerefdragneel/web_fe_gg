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

const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        This field is required!
      </div>
    );
  }
};

export function StudentTabAssignment({ id }) {
  const [listAssignments, setlistAssignments] = useState([]);
  const [listGrade, setListGrade] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [chosenAssignment, setChosenAssignment] = useState();
  const [chosenScore, setChosenScore] = useState({});
  const [listGradeReview, setListGradeReview] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const handleOpen = (assignmentId, grade) => {
    setChosenAssignment(assignmentId);
    setChosenScore(grade);
    setOpen(!open);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await gradeService.getGradeByClassId(id);
        setlistAssignments(
          res?.data?.data?.sort((a, b) => a.position - b.position)
        );
        setMessage("");
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const res = await gradeService.getSingleStudentScore(id, userId);
        setListGrade(res?.data?.data);
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const res =
          await gradereviewService.getGradeReviewRequestByStudentIdAndClassId(
            userId,
            id
          );
        setListGradeReview(res?.data?.data);
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const res = await classService.getlistteachers(id);
        setListTeacher(res?.data?.data);
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
        {!loading && listAssignments.length === 0 && (
          <div className="text-gray-900 text-center">No assignment found.</div>
        )}
        {!loading &&
          listAssignments?.length !== 0 &&
          listAssignments.map((value) => (
            <div className="flex flex-col  p-2 justify-end shadow-md w-full bg-slate-50 rounded my-2">
              {(listGradeReview.find(
                (item) => item.assignmentId === value.assignmentId
              )?.final_decision === null ??
                false) && (
                <div className="flex justify-end pt-2 z-10 items-center">
                  <Link
                    to={`/class/gradereview/details?classId=${id}&assignmentId=${value.assignmentId}&studentId=${userId}`}
                  >
                    <ChevronDoubleRightIcon className="w-5 h-5 text-neutral-700 font-bold hover:text-dark-green cursor-pointer mr-1" />
                  </Link>
                </div>
              )}
              <Card
                onClick={() => {
                  if (
                    value.isFinalized &&
                    !listGradeReview.find(
                      (grade) => grade.assignmentId === value.assignmentId
                    )
                  ) {
                    handleOpen(
                      value.assignmentId,
                      listGrade.find(
                        (grade) => grade.assignmentId === value.assignmentId
                      )?.score
                    );
                  }
                }}
                className="h-auto shadow-none  bg-slate-50"
              >
                <CardBody className="grid grid-cols-3 place-items-center -mt-5 p-3">
                  <Typography variant="paragraph" className="italic my-0">
                    Grade composition name:
                    <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                      {value?.name}
                    </div>
                  </Typography>

                  <Typography
                    variant="paragraph"
                    className="italic text-gray-900 my-0 mr-0"
                  >
                    Scale:
                    <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                      {value?.scale}%
                    </div>
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="italic text-gray-900 my-0"
                  >
                    Score:
                    <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                      {value.isFinalized
                        ? (listGrade.find(
                            (grade) => grade.assignmentId === value.assignmentId
                          )?.score || "N/A") +
                          (listGradeReview.find(
                            (item) => item.assignmentId === value.assignmentId
                          ) !== undefined
                            ? listGradeReview.find(
                                (item) =>
                                  item.assignmentId === value.assignmentId
                              )?.final_decision === null
                              ? " (Review Requested)"
                              : " (Resolved)"
                            : "")
                        : "N/A"}
                    </div>
                  </Typography>
                </CardBody>
              </Card>
            </div>
          ))}
        {message && <div className="text-red-500 text-center">{message}</div>}
      </div>
      <div className="flex justify-center">
        <Dialog
          open={open}
          handler={handleOpen}
          className="max-w-xl bg-white m-5 rounded-lg shadow-lg mt-20"
        >
          <DialogBody>
            <ReviewRequest
              assignmentId={chosenAssignment}
              classId={id}
              score={chosenScore}
              handleOpen={() => {
                setOpen(!open);
              }}
              listTeacher={listTeacher}
            ></ReviewRequest>
          </DialogBody>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}
