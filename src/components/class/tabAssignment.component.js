import { Classheader } from "./classheader.component";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classService from "../../services/class.service";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function TabAssignment(id) {
  const [assignments, setAssignments] = useState({});
  const [messageAssignments, setMessageAssignments] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await classService.getAllAssignment(id.id);
        setAssignments(res.data.data);
        console.log(assignments);
        setMessageAssignments("");
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setMessageAssignments(error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className=" ">
      <div className="grid grid-flow-row-dense grid-cols-2 gap-2 m-4 ">
        {assignments.length === 0 && (
          <div className="text-gray-900 text-center">No assignment found.</div>
        )}
        {assignments.length !== 0 &&
          Object.values(assignments).map((item) => {
            return (
              <div
                key={item.assignmentId}
                className="flex flex-col justify-end py-2 px-4 shadow-md w-full bg-slate-50"
              >
                <Card className="h-auto shadow-none  bg-slate-50">
                  <CardBody>
                    <Link
                      to={`/class/detail?id=${id.id}&assignmentId=${item.assignmentId}`}
                      className=" text-gray-900  hover:text-dark-green"
                    >
                      <div className="text-2xl text-dark-green font-bold mt-3">
                        {item.classId}
                      </div>
                    </Link>
                    <Typography variant="small" className="mb-2 italic mt-2">
                      {item.description}
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        {messageAssignments && (
          <div className="text-red-500 text-center">{messageAssignments}</div>
        )}
      </div>
    </div>
  );
}
