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

const HomeComponent = () => {
  const [movies, setMovies] = useState([]);

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
          setMovies(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const headings = [["Movie", "Category", "Director", "Rating"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, movies, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.xlsx");
  };

  return (
    <>
      <div className="row mb-2 mt-5">
        <div className="col-sm-6 offset-3">
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
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 offset-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Movie</th>
                <th scope="col">Category</th>
                <th scope="col">Director</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            <tbody>
              {movies.length ? (
                movies.map((movie, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{movie.Movie}</td>
                    <td>{movie.Category}</td>
                    <td>{movie.Director}</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {movie.Rating}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Movies Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;

export function TabGrade(id) {
  const [classStudents, setclassStudent] = useState({});
  const [messageStudent, setMessageStudent] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classService.getliststudents(id.id);
        setclassStudent(res.data.data);
        setMessageStudent("");
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setMessageStudent(error.message);
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

  const templatesForClass = () =>
    classStudents.map((user) => {
      return {
        ID: user.studentId,
        Fullname: user.studentenrollment.fullname,
      };
    });

  const handleExport = () => {
    const headings = [["ID", "Fullname"]];
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
      <div>
        <div className="w-full border-b-2 left-0 flex flex-row justify-between">
          <Typography variant="h5" color="blue-gray" className="left-0">
            Students
          </Typography>
          <Typography variant="h6" color="gray" className="font-normal">
            {classStudents.length} Students
          </Typography>
        </div>
        {messageStudent && <h1>{messageStudent}</h1>}
        <Card className="w-96">
          {classStudents.length === 0 && <h1>No student</h1>}
          {classStudents.length !== 0 && (
            <List>
              {Object.values(classStudents).map((user) => (
                <ListItem className="w-full">
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt="candice"
                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {user.studentenrollment.fullname ||
                        user.studentenrollment.username}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      Student
                    </Typography>
                  </div>
                </ListItem>
              ))}
            </List>
          )}
        </Card>

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
              <th scope="col">Id</th>
              <th scope="col">Movie</th>
              <th scope="col">Category</th>
              <th scope="col">Director</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {/* {movies.length ? (
              movies.map((movie, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{movie.Movie}</td>
                  <td>{movie.Category}</td>
                  <td>{movie.Director}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {movie.Rating}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Movies Found.
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
