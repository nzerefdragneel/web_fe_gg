import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import gradeService from "../../services/grade.service";
import classService from "../../services/class.service";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Input,
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { read, utils, writeFile } from "xlsx";
import UpdateGrade from "./updateGrade.component";
import { ToastContainer, toast } from "react-toastify";

export function DetailAssignment(id) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get("id");
  const assignmentId = queryParams.get("assignmentId");
  const [open, setOpen] = useState(false);
  const [assignment, setAssignment] = useState({});
  const [chosenStudent, setChosenStudent] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [chosenScore, setChosenScore] = useState(0);
  const [classData, setClassData] = useState({});
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [finalizeLoading, setFinalizeLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [hasImported, setHasImported] = useState();
  const [message, setMessage] = useState("");
  const [messageImport, setMessageImport] = useState("");

  const handleOpen = (student, grade) => {
    setChosenStudent(student);
    setChosenScore(grade);
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classService.getliststudents(classId);
        setStudents(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setMessage(error.message);
      }
      try {
        const res = await classService.getbyid(classId);
        setClassData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      try {
        const res = await gradeService.getSingleAssignment(assignmentId);
        setAssignment(res?.data?.data);
        console.log(res?.data?.data);
        setMessage("");
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const res = await gradeService.getGradeByAssignmentId(assignmentId);
        setGrades(res?.data?.data);
        setMessage("");
      } catch (error) {
        console.error("Error fetching data");
        setMessage("Error fetching data");
      }
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await classService.checkteacher(classId, user.id);
        setIsTeacher(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [assignmentId]);

  const handleUpload = ($event) => {
    const files = $event.target.files;
    let sheetGrade = [];
    let tempGradeList = [];
    if (files.length) {
      const file = files[0];
      setHasImported(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          sheetGrade = rows.map((row) => {
            return {
              studentId: students.find(
                (student) => parseInt(student.mssv) === row.MSSV
              )?.studentId,
              score: row.Grade,
            };
          });
        }
        tempGradeList = grades.map((grade) => {
          return {
            studentId: grade.studentId,
            score: sheetGrade.find(
              (sheetGrade) => sheetGrade.studentId === grade.studentId
            )?.score
              ? sheetGrade.find(
                  (sheetGrade) => sheetGrade.studentId === grade.studentId
                )?.score
              : grade.score,
          };
        });
        setGrades(tempGradeList);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImport = () => {
    gradeService
      .updateBatchScore(
        assignmentId,
        classId,
        grades,
        JSON.parse(localStorage.getItem("user")).id
      )
      .then((res) => {
        if (res.status === 201) {
          setMessageImport(res.data.message);
        } else {
          setMessageImport("Import fail");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const templatesForClass = () =>
    students.map((user) => {
      return {
        MSSV: user.mssv,
        Grade: grades.find((grade) => grade.studentId === user.studentId)?.score
          ? grades.find((grade) => grade.studentId === user.studentId)?.score
          : "N/A",
      };
    });

  console.log(templatesForClass());

  const handleExport = () => {
    const headings = [["MSSV", "Grade"]];
    const data = templatesForClass();
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "GradeList.xlsx");
  };

  return (
    <div className=" ">
      <div className="row">
        <Link to={`/home`}>
          <div className="text-xl font-bold text-dark-green mt-1 not-italic ml-2">
            Home
          </div>
        </Link>
        <p className="text-xl font-bold mt-1 not-italic ml-2"> / </p>
        <Link to={`/class/detail?id=${classId}`}>
          <div className="text-xl font-bold text-dark-green mt-1 not-italic ml-2">
            {classData.className}
          </div>
        </Link>
        <p className="text-xl font-bold mt-1 not-italic ml-2"> / </p>
        <div className="text-xl font-bold mt-1 not-italic ml-2">
          {assignment.name}
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-between border-b mb-2"></div>
      {isTeacher && (
        <div className="row">
          <div className="input-group col-md-6">
            <div className="custom-file">
              <input
                type="file"
                name="file"
                className="custom-file-input"
                id="inputGroupFile"
                required
                onChange={handleUpload}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile">
                Choose file
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <button
              onClick={handleExport}
              className="float-right px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3"
            >
              Export
            </button>
          </div>
        </div>
      )}
      <div>List Student</div>
      <div>
        <List>
          {students.map((student) => (
            <ListItem
              onClick={() => {
                handleOpen(
                  student,
                  grades.find((grade) => grade.studentId === student.studentId)
                    ?.score
                );
              }}
              key={student.studentId}
              className="px-8"
            >
              <ListItemPrefix>
                <Avatar
                  src={
                    student.studentenrollment?.user?.avatar
                      ? student.studentenrollment?.user?.avatar
                      : "https://i.pravatar.cc/300"
                  }
                  alt="..."
                />
              </ListItemPrefix>
              <div className="flex flex-row flex-wrap justify-between w-full">
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="text-xl font-bold mt-1 not-italic ml-2">
                    {student?.mssv}
                  </div>
                </div>
                <div className="flex flex-row flex-wrap justify-between">
                  <div className="text-xl font-bold mt-1 not-italic ml-2">
                    {student?.studentenrollment?.fullname ??
                      student?.studentenrollment?.username}
                  </div>
                </div>
                <div className="flex flex-row flex-wrap justify-between">
                  {grades.find((grade) => grade.studentId === student.studentId)
                    ?.score ?? "Not graded"}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
        {!assignment.isFinalized && (
          <button
            className="px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3"
            onClick={async () => {
              setFinalizeLoading(true);
              try {
                await gradeService
                  .finalizeGrade(assignmentId, classId)
                  .then((res) => {
                    if (res.status === 201) {
                      alert("Finalize Grade Success");
                      setFinalizeLoading(false);
                    } else {
                      alert("Finalize Grade Fail");
                      setFinalizeLoading(false);
                    }
                  });
              } catch (error) {
                console.log(error);
              }
              setFinalizeLoading(false);
            }}
            disabled={finalizeLoading}
          >
            {finalizeLoading ? (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            ) : (
              <span>Finalize this assignment</span>
            )}
          </button>
        )}

        {hasImported && (
          <button
            className="float-right px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3"
            onClick={async () => {
              setImportLoading(true);
              try {
                await handleImport();
              } catch (error) {
                console.log(error);
              }
              setImportLoading(false);
            }}
            disabled={importLoading}
          >
            {importLoading ? (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            ) : (
              <span>Import</span>
            )}
          </button>
        )}

        {messageImport && <h1>{messageImport}</h1>}

        <div className="flex justify-center">
          <Dialog
            open={open}
            handler={handleOpen}
            className="max-w-xl bg-white m-5 rounded-lg shadow-lg mt-20"
          >
            <DialogBody>
              <UpdateGrade
                student={chosenStudent}
                prevGrade={chosenScore}
                handleOpen={() => setOpen(!open)}
                assignmentId={assignmentId}
                classId={classId}
              />
            </DialogBody>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
