import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import gradeService from "../../services/grade.service";
import classService from "../../services/class.service";
import { List, ListItem, Dialog, DialogBody } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { read, utils, writeFile } from "xlsx";
import UpdateGrade from "./updateGrade.component";

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
    const [messageImport, setMessageImport] = useState("");
    const [loadData, setLoadData] = useState(false);

    const handleOpen = (student, grade) => {
        setChosenStudent(student);
        setChosenScore(grade);
        setOpen(!open);
    };

    const notifyUpdateSusscess = () => toast.success("Update Grade Success!");
    const notifyUpdateFail = () => toast.error("Update Grade Fail!");

    useEffect(() => {
        setLoadData(true);
        const fetchData = async () => {
            try {
                const res = await classService.getliststudents(classId);
                setStudents(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            try {
                const res = await classService.getbyid(classId);
                setClassData(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            try {
                const res = await gradeService.getSingleAssignment(
                    assignmentId
                );
                setAssignment(res?.data?.data);
            } catch (error) {
                console.error("Error fetching data");
            }
            try {
                const res = await gradeService.getGradeByAssignmentId(
                    assignmentId
                );
                setGrades(res?.data?.data);
            } catch (error) {
                console.error("Error fetching data");
            }
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await classService.checkteacher(classId, user.id);
                setIsTeacher(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            setLoadData(false);
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
                            (sheetGrade) =>
                                sheetGrade.studentId === grade.studentId
                        )?.score
                            ? sheetGrade.find(
                                  (sheetGrade) =>
                                      sheetGrade.studentId === grade.studentId
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
                Grade: grades.find(
                    (grade) => grade.studentId === user.studentId
                )?.score
                    ? grades.find((grade) => grade.studentId === user.studentId)
                          ?.score
                    : "N/A",
            };
        });

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

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className=" ">
            {loadData && (
                <div className=" mx-auto mt-4 text-center">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}

            {!loadData && (
                <>
                    <div className="ml-2 mt-1 row flex flex-row items-center">
                        <Link
                            to={`/home`}
                            className="hover:decoration-dark-green"
                        >
                            <div className="text-xl text-dark-green not-italic ">
                                Home
                            </div>
                        </Link>
                        <ChevronRightIcon className="w-5 h-5 mx-2 mt-1" />
                        <Link
                            to={`/class/detail?id=${classId}`}
                            className="hover:decoration-dark-green"
                        >
                            <div className="text-xl text-dark-green not-italic">
                                {classData.className}
                            </div>
                        </Link>
                        <ChevronRightIcon className="w-5 h-5 mx-2 mt-1" />
                        <div className="text-xl  not-italic ">
                            {assignment.name}
                        </div>
                    </div>
                    <hr className=" text-light-green mx-auto w-full" />
                    {isTeacher && (
                        <div className="row mt-8 mx-8 mb-8">
                            <div className=" ml-6 input-group col-md-6">
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
                                    <label
                                        className="custom-file-label italic"
                                        htmlFor="inputGroupFile"
                                    >
                                        Choose file to import grade
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <button
                                    onClick={handleExport}
                                    className="float-right px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm"
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="text-3xl text-dark-green font-bold mt-4 ml-8 mb-2">
                        List Student
                    </div>
                    <div className="mx-auto w-8/12 mt-3">
                        <List className="gap-0">
                            <ListItem className="px-8 py-4 rounded-none border-b border-dark-green hover:cursor-default pointer-events-none">
                                <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-1 justify-items-start content-center w-full gap-x-2 gap-y-1">
                                    <div className="italic text-base col-span-1">
                                        STT
                                    </div>
                                    <div className="text-base italic lg:col-span-3 md:col-span-3 col-span-1">
                                        MSSV
                                    </div>
                                    <div className="text-base italic lg:col-span-6 md:col-span-5 col-span-1">
                                        Full Name
                                    </div>
                                    <div className="justify-self-end text-base italic lg:col-span-2 md:col-span-1 col-span-1">
                                        Grade
                                    </div>
                                </div>
                            </ListItem>
                            {students?.map((student, index) => (
                                <>
                                    <ListItem
                                        onClick={() => {
                                            handleOpen(
                                                student,
                                                grades.find(
                                                    (grade) =>
                                                        grade.studentId ===
                                                        student.studentId
                                                )?.score
                                            );
                                        }}
                                        key={student.studentId}
                                        className="px-8 border-b  border-dark-green hover:bg-neutral-100 cursor-pointer rounded-none"
                                    >
                                        <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-1 justify-items-start content-center w-full gap-x-2 gap-y-1 py-3">
                                            <div className="italic font-semibold text-lg col-span-1 text-dark-green">
                                                {index + 1}
                                            </div>
                                            <div className="text-xl lg:col-span-3 md:col-span-3 col-span-1 font-semibold">
                                                {student?.mssv}
                                            </div>
                                            <div className="text-xl lg:col-span-6 md:col-span-5 col-span-1  font-semibold">
                                                {student?.studentenrollment
                                                    ?.fullname ??
                                                    student?.studentenrollment
                                                        ?.username}
                                            </div>
                                            <div className="justify-self-end text-xl lg:col-span-2 md:col-span-1 col-span-1">
                                                {grades.find(
                                                    (grade) =>
                                                        grade.studentId ===
                                                        student.studentId
                                                )?.score ?? "Not graded"}
                                            </div>
                                        </div>
                                    </ListItem>
                                </>
                            ))}
                        </List>
                        {!assignment.isFinalized && (
                            <button
                                className="px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm mt-3"
                                onClick={async () => {
                                    setFinalizeLoading(true);
                                    try {
                                        await gradeService
                                            .finalizeGrade(
                                                assignmentId,
                                                classId
                                            )
                                            .then((res) => {
                                                if (res.status === 201) {
                                                    alert(
                                                        "Finalize Grade Success"
                                                    );
                                                    setFinalizeLoading(false);
                                                } else {
                                                    alert(
                                                        "Finalize Grade Fail"
                                                    );
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
                                        handleClose={handleClose}
                                        assignmentId={assignmentId}
                                        classId={classId}
                                        notifyUpdateSusscess={
                                            notifyUpdateSusscess
                                        }
                                        notifyUpdateFail={notifyUpdateFail}
                                    />
                                </DialogBody>
                            </Dialog>
                        </div>
                    </div>
                    <ToastContainer />
                </>
            )}
        </div>
    );
}
