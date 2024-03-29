import React, { useState, useEffect } from "react";
import classService from "../../services/class.service";
import { List, ListItem, Card, Typography } from "@material-tailwind/react";
import { read, utils, writeFile } from "xlsx";

export function TabEverybody(id) {
  const [classTeachers, setclassTeachers] = useState({});
  const [classStudents, setclassStudent] = useState({});
  const [isTeacher, setIsTeacher] = useState(false);
  const [hasImported, setHasImported] = useState();
  const [messageTeacher, setMessageTeacher] = useState("");
  const [messageStudent, setMessageStudent] = useState("");
  const [messageImport, setMessageImport] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classService.getlistteachers(id.id);
        setclassTeachers(res.data.data);
        setMessageTeacher("");
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setMessageTeacher(error.message);
      }
      try {
        const res = await classService.getliststudents(id.id);
        setclassStudent(res.data.data);
        console.log(classStudents);
        setMessageStudent("");
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setMessageStudent(error.message);
      }
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await classService.checkteacher(id.id, user.id);
        setIsTeacher(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [id]);

  let students;

  const handleUpload = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      setHasImported(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          students = rows.map((row) => {
            return {
              mssv: row.MSSV,
              studentenrollment: {
                fullname: row.Fullname,
              },
            };
          });
        }
        setclassStudent(students);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImport = () => {
    classService
      .addStudents(id, students)
      .then(
        (response) => {
          const existsCount = response.data.data.existsCount;
          const notFoundCount = response.data.data.notFoundCount;
          if (existsCount === 0 && notFoundCount === 0) {
            setMessageImport("Imported successfully");
          } else {
            setMessageImport(
              `Imported successfully. ${existsCount} students already existed and ${notFoundCount} students cannot be imported.`
            );
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .then(async () => {
        await classService.getliststudents(id.id).then((res) => {
          setclassStudent(res.data.data);
        });
      });
  };

  const templatesForClass = () =>
    classStudents.map((user) => {
      return {
        MSSV: user.mssv,
        Fullname: user.studentenrollment.fullname,
      };
    });

  const handleExport = () => {
    const headings = [["MSSV", "Fullname"]];
    const data = templatesForClass();
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "StudentList.xlsx");
  };

  return (
    <div className=" ">
      {isTeacher && (
        <div className="row mt-3 mb-4 mx-3">
          {/* <div className="input-group col-md-6">
                        <div className="custom-file ml-4">
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
                                Choose file
                            </label>
                        </div>
                    </div> */}
          <div className="col-md-6">
            <button
              onClick={handleExport}
              className=" px-4 py-2.5 text-white bg-dark-green rounded-lg text-sm mr-5"
            >
              Export <i className="fa fa-download"></i>
            </button>
          </div>
        </div>
      )}
      {messageTeacher && <h1 className="mx-auto mt-3">{messageTeacher}</h1>}
      <div className="mx-4 my-5">
        {classTeachers.length === 0 && <h1>No teacher</h1>}
        <div className=" border-b-2 left-0 flex flex-row justify-between">
          <Typography variant="h5" className="left-0 text-dark-green">
            Teachers
          </Typography>
          <Typography variant="h6" color="gray" className="font-normal">
            {classTeachers.length} Teachers
          </Typography>
        </div>
        <Card className="border-none shadow-none pointer-events-none w-10/12 mx-auto">
          {classTeachers.length !== 0 && (
            <List className="gap-0">
              {Object.values(classTeachers).map((user, index) => (
                <ListItem key={index} className="flex flex-col items-start">
                  <Typography variant="h6" color="blue-gray">
                    {user.teacher.fullname || user.teacher.username}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Card>
      </div>
      <div className="mx-4 mt-5">
        <div className=" border-b-2 left-0 flex flex-row justify-between">
          <Typography variant="h5" className="left-0 text-dark-green">
            Students
          </Typography>
          <Typography variant="h6" color="gray" className="font-normal">
            {classStudents.length} Students
          </Typography>
        </div>
        {messageStudent && <h1>{messageStudent}</h1>}
        <Card className="border-none shadow-none pointer-events-none w-10/12 mx-auto">
          {classStudents.length === 0 && <h1>No student</h1>}
          {classStudents.length !== 0 && (
            <List className="gap-0">
              {Object.values(classStudents).map((user, index) => (
                <ListItem key={index} className="flex flex-col items-start">
                  <Typography variant="h6" color="blue-gray">
                    {user.studentenrollment.fullname ||
                      user.studentenrollment.username}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    MSSV: {user.mssv}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Card>
      </div>
      {hasImported && (
        <div className="col-md-6">
          <button
            onClick={handleImport}
            className="btn btn-primary float-right"
          >
            Import <i className="fa fa-download"></i>
          </button>
        </div>
      )}
      {messageImport && <h1>{messageImport}</h1>}
    </div>
  );
}
