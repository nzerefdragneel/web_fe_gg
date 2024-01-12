import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import classService from "../../services/class.service";
import { read, utils, writeFile } from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
const TABLE_HEAD = ["User Id", "Student Id", "Fullname"];

export function TabEverybodyManager() {
    const [Student, setStudent] = useState([]);
    const [currentpage, setcurrentpage] = useState(1);
    const [limit, setlimit] = useState(5);
    const [totalpage, settotalpage] = useState(1);
    const [total, settotal] = useState(0);
    const [message, setMessage] = useState("");
    const [ascending, setascending] = useState(true);
    const [search, setsearch] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get("id");
    const [open, setOpen] = React.useState(false);
    const fileInputRef = useRef(null);
    const [newStudentId, setnewStudentId] = useState("");
    const [loading, setLoading] = useState(false);

    const notifyUpdateSusscess = () =>
        toast.success("Update Student ID Success!");
    const notifyExisted = (message) => toast.error(message);
    const handleOpen = () => {
        setnewStudentId("");
        setOpen(!open);
    };
    const templatesForStudentId = () =>
        Student.map((user) => {
            console.log(user);
            const userGrade = {};
            userGrade["UserId"] = user.studentId;
            userGrade["Fullname"] = user.studentenrollment.fullname;
            userGrade["StudentId"] = user.mssv;
            return userGrade;
        });
    const handleExport = () => {
        const headings = [["UserId", "Fullname", "StudentId"]];
        const data = templatesForStudentId();
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, data, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "ListStudent");
        writeFile(wb, "StudentList" + classId + ".xlsx");
    };
    const handleClickImportbutton = () => {
        // Trigger the file input click event
        fileInputRef.current.click();
    };
    const handleImport = ($event) => {
        console.log("Begin import");
        const files = $event.target.files;
        let sheetStudent = [];
        let tempStudentList = [];
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = async (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    sheetStudent = rows.map((row) => {
                        return {
                            UserId: row["UserId"],
                            Fullname: row["Fullname"],
                            StudentId: row["StudentId"],
                        };
                    });
                    console.log("sheet", sheetStudent);
                    await classService
                        .importStudentIdAdmin(classId, sheetStudent)
                        .then((response) => {
                            console.log("ok", response);
                            toast.success("Update Success!");
                            fetchStudent();
                        })
                        .catch((error) => {
                            const resMessage =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString();
                            setMessage(resMessage);
                            toast.error(resMessage);
                        });
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const fetchStudent = async () => {
        await classService
            .getAllStudentAdmin(classId, currentpage, limit, ascending)
            .then((response) => {
                console.log(response);
                setStudent(response.data.data.classes);
                settotal(response.data.data.totalItems);
                settotalpage(response.data.data.totalPages);

                console.log(Student);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });

        setLoading(false);
    };
    const fetchStudentSearch = async () => {
        await classService
            .getAllStudentSearch(currentpage, limit, ascending, search)
            .then((response) => {
                console.log(response);
                setStudent(response.data.Student);
                settotal(response.data.totalItems);
                settotalpage(response.data.totalPages);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        fetchStudentSearch();
    };

    const handleUnMapMssv = (studentId, mssv) => {
        console.log(studentId, mssv);
        classService
            .updatemssv(classId, studentId, mssv)
            .then((response) => {
                console.log(response);
                notifyExisted("Unmap Success!");
                setMessage(response.data.message);
                setStudent(
                    Student.map((Student) => {
                        if (Student.studentId === studentId) {
                            Student.mssv = mssv;
                        }
                        return Student;
                    })
                );
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                notifyExisted(resMessage);
            });
    };

    const handleMapMssv = (studentId) => {
        console.log(studentId);
        if (newStudentId === "") {
            setMessage("Student ID is not null");
            return;
        }
        classService
            .checkmssv(classId, newStudentId)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    return classService.updatemssv(
                        classId,
                        studentId,
                        newStudentId
                    );
                } else {
                    const resMessage =
                        (response.data && response.data.message) ||
                        response.message ||
                        response.toString();
                    throw new Error(resMessage);
                }
            })
            .then((res) => {
                setnewStudentId("");
                notifyUpdateSusscess();
                setMessage(res.data.message);
                setStudent(
                    Student.map((Student) => {
                        if (Student.studentId === studentId) {
                            Student.mssv = newStudentId;
                        }
                        return Student;
                    })
                );
            })
            .catch((error) => {
                setnewStudentId("");

                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                notifyExisted(resMessage);
            });
    };
    useEffect(() => {
        setLoading(true);
        fetchStudent();
    }, [currentpage, limit, ascending]);
    const onsortchange = () => {
        setascending(!ascending);
    };

    return (
        <div className="flex flex-wrap flex-col ">
            {loading && (
                <div className=" mx-auto text-center mt-4">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}
            {!loading && (
                <>
                    <div className="page-header">
                        <div className="flex flex-wrap items-center mb-8">
                            <div className="flex flex-col flex-grow max-w-full flex-1 px-4">
                                <h3 className="mb-3 float-left mt-2 text-dark-green">
                                    Manager Student In Class
                                </h3>
                                <div className="mt-3 justify-center flex flex-row items-center">
                                    <form
                                        class="flex items-center max-w-3xl grow"
                                        onSubmit={handlesubmit}
                                    >
                                        <label
                                            for="simple-search"
                                            class="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div class="relative w-full">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                value={search}
                                                onChange={(e) =>
                                                    setsearch(e.target.value)
                                                }
                                                type="text"
                                                id="simple-search"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                                                placeholder="Search branch name..."
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="p-2.5 ms-2 text-sm font-medium text-white bg-dark-green rounded-lg border border-dark-green hover:bg-medium-green focus:ring-4 focus:outline-none focus:ring-blue-300"
                                        >
                                            <svg
                                                class="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                            <span
                                                class="sr-only"
                                                onClick={handlesubmit}
                                            >
                                                Search
                                            </span>
                                        </button>
                                    </form>
                                    <select
                                        id="sort"
                                        onChange={onsortchange}
                                        class="ml-3 mr-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                                    >
                                        <option value="true" selected>
                                            Ascending
                                        </option>
                                        <option value="false">
                                            Descending
                                        </option>
                                    </select>
                                    <div className="ml-7">
                                        <button
                                            onClick={handleExport}
                                            className=" bg-dark-green rounded-lg border border-dark-green hover:bg-medium-green px-4 py-2 text-white"
                                        >
                                            Export{" "}
                                            <i className="fa fa-download"></i>
                                        </button>
                                    </div>
                                    <div className=" ml-3">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleImport}
                                        />
                                        <button
                                            onClick={handleClickImportbutton}
                                            className=" bg-dark-green rounded-lg border border-dark-green hover:bg-medium-green px-4 py-2 text-white"
                                        >
                                            Import{" "}
                                            <i className="fa fa-upload"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-full pr-4 pl-4">
                        <div className="flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card card-table">
                            <div className="flex-auto p-6 card-body booking_card">
                                <div className="block  scrolling-touch">
                                    <table className="datatable max-w-60 bg-transparent overflow-scroll snap-both scroll-auto table-stripped table-hover table-center mb-0 table">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map((head) => (
                                                    <th key={head}>{head}</th>
                                                ))}
                                                <th className="text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Student != null &&
                                                Student.map((Student) => {
                                                    return (
                                                        <tr
                                                            key={
                                                                Student.studentId
                                                            }
                                                        >
                                                            <td>
                                                                {
                                                                    Student.studentId
                                                                }
                                                            </td>
                                                            <td>
                                                                {Student.mssv
                                                                    ? Student.mssv
                                                                    : "Null"}
                                                            </td>
                                                            <td>
                                                                {Student
                                                                    .studentenrollment
                                                                    .fullname
                                                                    ? Student
                                                                          .studentenrollment
                                                                          .fullname
                                                                    : Student
                                                                          .studentenrollment
                                                                          .username}
                                                            </td>

                                                            <td>
                                                                <div className="actions">
                                                                    {(Student.mssv ===
                                                                        null ||
                                                                        Student.mssv ===
                                                                            "") && (
                                                                        <div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={
                                                                                    handleOpen
                                                                                }
                                                                                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                                            >
                                                                                Map
                                                                                ID
                                                                            </button>
                                                                            <Dialog
                                                                                open={
                                                                                    open
                                                                                }
                                                                                handler={
                                                                                    handleOpen
                                                                                }
                                                                                className="w-96 border-4"
                                                                            >
                                                                                <DialogBody>
                                                                                    <div className="mb-1 flex flex-col gap-6">
                                                                                        <Typography
                                                                                            variant="h6"
                                                                                            color="blue-gray"
                                                                                            className="-mb-3"
                                                                                        >
                                                                                            Type
                                                                                            Student
                                                                                            ID
                                                                                        </Typography>
                                                                                        <Input
                                                                                            size="lg"
                                                                                            placeholder="Student ID"
                                                                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                                            labelProps={{
                                                                                                className:
                                                                                                    "before:content-none after:content-none",
                                                                                            }}
                                                                                            value={
                                                                                                newStudentId
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                setnewStudentId(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </DialogBody>
                                                                                <DialogFooter>
                                                                                    <Button
                                                                                        variant="text"
                                                                                        color="red"
                                                                                        onClick={
                                                                                            handleOpen
                                                                                        }
                                                                                        className="mr-1"
                                                                                    >
                                                                                        <span>
                                                                                            Cancel
                                                                                        </span>
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="text"
                                                                                        color="green"
                                                                                        onClick={() =>
                                                                                            handleMapMssv(
                                                                                                Student.studentId
                                                                                            )
                                                                                        }
                                                                                        className="mr-1"
                                                                                    >
                                                                                        <span>
                                                                                            Map
                                                                                            Student
                                                                                            ID
                                                                                        </span>
                                                                                    </Button>
                                                                                </DialogFooter>
                                                                            </Dialog>
                                                                        </div>
                                                                    )}
                                                                    {Student.mssv !==
                                                                        null &&
                                                                        Student.mssv !==
                                                                            "" && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleUnMapMssv(
                                                                                        Student.studentId,
                                                                                        ""
                                                                                    )
                                                                                }
                                                                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                            >
                                                                                Unmap
                                                                                ID
                                                                            </button>
                                                                        )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setcurrentpage(
                                                currentpage > 1
                                                    ? currentpage - 1
                                                    : currentpage
                                            )
                                        }
                                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Previous
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setcurrentpage(
                                                currentpage < totalpage
                                                    ? currentpage + 1
                                                    : currentpage
                                            )
                                        }
                                        className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </>
            )}
        </div>
    );
}
