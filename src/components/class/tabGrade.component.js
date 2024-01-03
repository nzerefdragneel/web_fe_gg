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
  //     {
  //         "studentMssv": "10048",
  //         "studentId": 48,
  //         "studentName": "",
  //         "studentScore": [
  //             {
  //                 "assignmentId": 2,
  //                 "assignmentScale": 20,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN1",
  //                 "assignmentScore": 6
  //             },
  //             {
  //                 "assignmentId": 3,
  //                 "assignmentScale": 80,
  //                 "assignmentIsFinalized": true,
  //                 "assignmentName": "BTCN2",
  //                 "assignmentScore": 6
  //             },
  //             {
  //                 "assignmentId": 4,
  //                 "assignmentScale": 10,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN3",
  //                 "assignmentScore": null
  //             }
  //         ]
  //     },
  //     {
  //         "studentMssv": "10085",
  //         "studentId": 85,
  //         "studentName": "",
  //         "studentScore": [
  //             {
  //                 "assignmentId": 2,
  //                 "assignmentScale": 20,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN1",
  //                 "assignmentScore": 10
  //             },
  //             {
  //                 "assignmentId": 3,
  //                 "assignmentScale": 80,
  //                 "assignmentIsFinalized": true,
  //                 "assignmentName": "BTCN2",
  //                 "assignmentScore": 7
  //             },
  //             {
  //                 "assignmentId": 4,
  //                 "assignmentScale": 10,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN3",
  //                 "assignmentScore": null
  //             }
  //         ]
  //     },
  //     {
  //         "studentMssv": "10053",
  //         "studentId": 53,
  //         "studentName": "",
  //         "studentScore": [
  //             {
  //                 "assignmentId": 2,
  //                 "assignmentScale": 20,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN1",
  //                 "assignmentScore": 7
  //             },
  //             {
  //                 "assignmentId": 3,
  //                 "assignmentScale": 80,
  //                 "assignmentIsFinalized": true,
  //                 "assignmentName": "BTCN2",
  //                 "assignmentScore": 8
  //             },
  //             {
  //                 "assignmentId": 4,
  //                 "assignmentScale": 10,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN3",
  //                 "assignmentScore": null
  //             }
  //         ]
  //     },
  //     {
  //         "studentMssv": "10054",
  //         "studentId": 54,
  //         "studentName": "",
  //         "studentScore": [
  //             {
  //                 "assignmentId": 2,
  //                 "assignmentScale": 20,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN1",
  //                 "assignmentScore": 8
  //             },
  //             {
  //                 "assignmentId": 3,
  //                 "assignmentScale": 80,
  //                 "assignmentIsFinalized": true,
  //                 "assignmentName": "BTCN2",
  //                 "assignmentScore": 10
  //             },
  //             {
  //                 "assignmentId": 4,
  //                 "assignmentScale": 10,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN3",
  //                 "assignmentScore": null
  //             }
  //         ]
  //     },
  //     {
  //         "studentMssv": "10066",
  //         "studentId": 66,
  //         "studentName": "",
  //         "studentScore": [
  //             {
  //                 "assignmentId": 2,
  //                 "assignmentScale": 20,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN1",
  //                 "assignmentScore": 9
  //             },
  //             {
  //                 "assignmentId": 3,
  //                 "assignmentScale": 80,
  //                 "assignmentIsFinalized": true,
  //                 "assignmentName": "BTCN2",
  //                 "assignmentScore": 9
  //             },
  //             {
  //                 "assignmentId": 4,
  //                 "assignmentScale": 10,
  //                 "assignmentIsFinalized": false,
  //                 "assignmentName": "BTCN3",
  //                 "assignmentScore": null
  //             }
  //         ]
  //     }
  // ]

  const assignmentsList = [];
  scorings.forEach((scoring) => {
    scoring.studentScore.forEach((assignment) => {
      if (
        !assignmentsList.includes(
          assignment.assignmentName + ` (${assignment.assignmentScale}%)`
        )
      ) {
        assignmentsList.push(
          assignment.assignmentName + ` (${assignment.assignmentScale}%)`
        );
      }
    });
  });

  console.log("assignmentsList: ", assignmentsList);

  const studentsGrade = [];
  scorings.forEach((scoring) => {
    const studentGrade = {
      studentId: scoring.studentMssv,
      assignments: [],
    };
    let total = 0;
    scoring.studentScore.forEach((assignment) => {
      if (assignment.assignmentIsFinalized) {
        studentGrade.assignments.push(assignment.assignmentScore);
        total +=
          assignment.assignmentScore * (assignment.assignmentScale / 100);
      } else {
        studentGrade.assignments.push(null);
      }
    });
    studentGrade.total = Math.round((total + Number.EPSILON) * 100) / 100;

    studentsGrade.push(studentGrade);
  });

  console.log("studentGrade", studentsGrade);

  const templatesForGrade = () =>
    studentsGrade.map((user) => {
      const userGrade = {};
      userGrade["ID"] = user.studentId;
      user.assignments.forEach((assignment, index) => {
        userGrade[assignmentsList[index]] = assignment ? assignment : "N/A";
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
                    <td>{score ? score : "N/A"}</td>
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
