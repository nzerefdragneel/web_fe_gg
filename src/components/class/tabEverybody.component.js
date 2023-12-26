
import { Classheader } from "./classheader.component";
import React, { useState, useEffect } from "react";
import classService from "../../services/class.service";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
export function TabEverybody(id ) {

    const [classTeachers, setclassTeachers] = useState({});
    const [classStudents,setclassStudent]=useState({})
    const [messageTeacher,setMessageTeacher]=useState('');
    const [messageStudent,setMessageStudent]=useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await classService.getlistteachers(id.id);
              setclassTeachers(res.data.data)
              setMessageTeacher('')
            } catch (error) {
              console.error('Error fetching data:', error.message);
              setMessageTeacher(error.message)
            }
            try {
              const res = await classService.getliststudents(id.id);
              setclassStudent(res.data.data)
              setMessageStudent('')
            } catch (error) {
              console.error('Error fetching data:', error.message);
              setMessageStudent(error.message)
            }
          };
        fetchData();
    }, [id]);
    return (
        <div className=" ">
           {messageTeacher &&<h1>{messageTeacher}</h1>}
           <div>
            {classTeachers.length===0 && <h1>No teacher</h1>}
           <div className="w-full border-b-2">
            <Typography variant="h5" color="blue-gray" className="left-0">
                     Teachers
            </Typography>
            </div>
           <Card className="w-96">
            {classTeachers.length!==0 &&
            <List>
            {Object.values(classTeachers).map(user=>(
                  <ListItem className="w-full">
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {user.teacher.fullname||user.teacher.username}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Teacher
                    </Typography>
                  </div>
                 </ListItem>
             ))}
            </List>}
          </Card>
          </div>
          <div>
           <div className="w-full border-b-2 left-0 flex flex-row justify-between" >
           <Typography variant="h5" color="blue-gray" className="left-0">
                     Students
                    </Typography>
           <Typography variant="h6" color="gray" className="font-normal">
                    {classStudents.length} Students
                    </Typography>
           
           </div>
           {messageStudent &&<h1>{messageStudent}</h1>}
           <Card className="w-96">
           {classStudents.length===0 && <h1>No student</h1>}
           {classStudents.length!==0 &&
            <List>
            {Object.values(classStudents).map(user=>(
                  <ListItem className="w-full">
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {user.studentenrollment.fullname||user.studentenrollment.username}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Student
                    </Typography>
                  </div>
                 </ListItem>
             ))}
            </List>}
          </Card>
          </div>
        </div>
    );
}