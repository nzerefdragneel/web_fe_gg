import { useState, useEffect } from "react";
import classService from "../../services/class.service";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { read, utils, writeFile } from "xlsx";

export function TabGrade(id) {
  const [scorings, setScorings] = useState([]);
  const [messageScorings, setMessageScorings] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classService.getScorings(id.id);
        setScorings(res.data.data);
        setMessageScorings("");
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setMessageScorings(error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          console.log(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // "data": [
  //       {
  //           "studentId": 48,
  //           "assignments": [
  //               {
  //                   "assignmentId": 2,
  //                   "score": 6,
  //                   "scale": 0.2
  //               },
  //               {
  //                   "assignmentId": 3,
  //                   "score": 6,
  //                   "scale": 0.8
  //               }
  //           ]
  //       },
  //       {
  //           "studentId": 53,
  //           "assignments": [
  //               {
  //                   "assignmentId": 2,
  //                   "score": 7,
  //                   "scale": 0.2
  //               },
  //               {
  //                   "assignmentId": 3,
  //                   "score": 8,
  //                   "scale": 0.8
  //               }
  //           ]
  //       },
  //       {
  //           "studentId": 54,
  //           "assignments": [
  //               {
  //                   "assignmentId": 2,
  //                   "score": 8,
  //                   "scale": 0.2
  //               },
  //               {
  //                   "assignmentId": 3,
  //                   "score": 10,
  //                   "scale": 0.8
  //               }
  //           ]
  //       },
  //       {
  //           "studentId": 66,
  //           "assignments": [
  //               {
  //                   "assignmentId": 2,
  //                   "score": 9,
  //                   "scale": 0.2
  //               },
  //               {
  //                   "assignmentId": 3,
  //                   "score": 9,
  //                   "scale": 0.8
  //               }
  //           ]
  //       },
  //       {
  //           "studentId": 85,
  //           "assignments": [
  //               {
  //                   "assignmentId": 2,
  //                   "score": 10,
  //                   "scale": 0.2
  //               },
  //               {
  //                   "assignmentId": 3,
  //                   "score": 7,
  //                   "scale": 0.8
  //               }
  //           ]
  //       }
  //   ]

  const assignmentsList = [];
  scorings.forEach((scoring) => {
    scoring.assignments.forEach((assignment) => {
      if (!assignmentsList.includes(assignment.assignmentId)) {
        assignmentsList.push(assignment.assignmentId);
      }
    });
  });

  const studentsGrade = [];
  scorings.forEach((scoring) => {
    const studentGrade = {
      studentId: scoring.studentId,
      assignments: [],
    };
    let total = 0;
    scoring.assignments.forEach((assignment) => {
      studentGrade.assignments.push(assignment.score ? assignment.score : 0);
      total += (assignment.score * assignment.scale) / 100;
    });
    studentGrade.total = total;

    studentsGrade.push(studentGrade);
  });

  const templatesForGrade = () =>
    studentsGrade.map((user) => {
      const userGrade = {};
      userGrade["ID"] = user.studentId;
      user.assignments.forEach((assignment, index) => {
        userGrade[" " + assignmentsList[index]] = assignment ? assignment : 0;
      });
      userGrade["Total"] = user.total;
      return userGrade;
    });

  console.log(templatesForGrade());

  const handleExport = () => {
    const headings = [["ID", ...assignmentsList, "Total"]];
    const data = templatesForGrade();
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "GradeReport.xlsx");
  };

  return (
    <div className=" ">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                name="file"
                className="custom-file-input"
                id="inputGroupFile"
                required
                onChange={handleImport}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile">
                Choose file
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <button
            onClick={handleExport}
            className="btn btn-primary float-right"
          >
            Export <i className="fa fa-download"></i>
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            {assignmentsList.length ? (
              assignmentsList.map((value) => (
                <th scope="col" key={value}>
                  {value}
                </th>
              ))
            ) : (
              <th scope="col"></th>
            )}
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {studentsGrade.length ? (
            studentsGrade.map((student) => (
              <tr key={student.studentId}>
                <th scope="row">{student.studentId}</th>
                {student.assignments.length ? (
                  student.assignments.map((score) => (
                    <td>{score ? score : 0}</td>
                  ))
                ) : (
                  <td></td>
                )}
                <td>{student.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Student Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
