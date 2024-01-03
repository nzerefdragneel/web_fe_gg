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
} from "@material-tailwind/react";
import { read, utils, writeFile } from "xlsx";

export function DetailAssignment(id) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get("id");
  const assignmentId = queryParams.get("assignmentId");

  const [assignment, setAssignment] = useState({});
  const [classData, setClassData] = useState({});
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [message, setMessage] = useState("");

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
    };
    fetchData();
  }, [assignmentId]);

  // const [classTeachers, setclassTeachers] = useState({});
  // const [classStudents, setclassStudent] = useState({});
  // const [isTeacher, setIsTeacher] = useState(false);
  // const [messageTeacher, setMessageTeacher] = useState("");
  // const [messageStudent, setMessageStudent] = useState("");
  // const [messageImport, setMessageImport] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await classService.getlistteachers(id.id);
  //       setclassTeachers(res.data.data);
  //       setMessageTeacher("");
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //       setMessageTeacher(error.message);
  //     }
  //     try {
  //       const res = await classService.getliststudents(id.id);
  //       setclassStudent(res.data.data);
  //       setMessageStudent("");
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //       setMessageStudent(error.message);
  //     }
  //     try {
  //       const user = JSON.parse(localStorage.getItem("user"));
  //       const res = await classService.checkteacher(id.id, user.id);
  //       setIsTeacher(res.data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  // const handleImport = ($event) => {
  //   const files = $event.target.files;
  //   if (files.length) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const wb = read(event.target.result);
  //       const sheets = wb.SheetNames;

  //       if (sheets.length) {
  //         const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
  //         const students = rows.map((row) => {
  //           return {
  //             studentId: row.ID,
  //             fullname: row.Fullname,
  //           };
  //         });
  //         console.log(id, students);
  //         classService
  //           .addStudents(id, students)
  //           .then(
  //             (response) => {
  //               const existsCount = response.data.data.existsCount;
  //               const notFoundCount = response.data.data.notFoundCount;
  //               if (existsCount === 0 && notFoundCount === 0) {
  //                 setMessageImport("Imported successfully");
  //               } else {
  //                 setMessageImport(
  //                   `Imported successfully. ${existsCount} students already existed and ${notFoundCount} students cannot be imported.`
  //                 );
  //               }
  //             },
  //             (error) => {
  //               console.log(error);
  //             }
  //           )
  //           .then(async () => {
  //             await classService.getliststudents(id.id).then((res) => {
  //               setclassStudent(res.data.data);
  //             });
  //           });
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  // const templatesForClass = () =>
  //   classStudents.map((user) => {
  //     return {
  //       ID: user.studentId,
  //       Fullname: user.studentenrollment.fullname,
  //     };
  //   });

  // const handleExport = () => {
  //   const headings = [["ID", "Fullname"]];
  //   const data = templatesForClass();
  //   const wb = utils.book_new();
  //   const ws = utils.json_to_sheet([]);
  //   utils.sheet_add_aoa(ws, headings);
  //   utils.sheet_add_json(ws, data, {
  //     origin: "A2",
  //     skipHeader: true,
  //   });
  //   utils.book_append_sheet(wb, ws, "Report");
  //   writeFile(wb, "StudentList.xlsx");
  // };

  return (
    <div className=" ">
      <div className="row">
        <Link to={`/home`}>
          <div className="text-xl font-bold mt-1 not-italic ml-2">Home</div>
        </Link>
        <p className="text-xl font-bold mt-1 not-italic ml-2"> / </p>
        <Link to={`/class/detail?id=${classId}`}>
          <div className="text-xl font-bold mt-1 not-italic ml-2">
            {classData.className}
          </div>
        </Link>
        <p className="text-xl font-bold mt-1 not-italic ml-2"> / </p>
        <div className="text-xl font-bold mt-1 not-italic ml-2">
          {assignment.name}
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-between border-b mb-2"></div>
      <div>List Student</div>
      <div>
        <List>
          {students.map((student) => (
            <ListItem
              color="lightBlue"
              ripple="light"
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
                  <Input
                    type="text"
                    className="form-control p-3 rounded required"
                    name="points"
                    placeholder={
                      grades.find(
                        (grade) => grade.studentId === student.studentId
                      )?.score
                    }
                    onChange={(e) => {
                      // setUsername(e.target.value);
                    }}
                  />
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
