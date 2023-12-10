
import { Classheader } from "./classheader.component";
import React, { useState, useEffect } from "react";
import classService from "../../services/class.service";
export function TabEverybody(id ) {

    const [classTeachers, setclassTeachers] = useState({});
    const [classStudents,setclassStudent]=useState({})
    const [message,setMessage]=useState('');
      
    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await classService.getlistteachers(id.id);
              setclassTeachers(res.data.data)
              const students=await classService.getliststudents(id.id);
              setclassStudent(students.data.data)
              console.log(res);
            } catch (error) {
              console.error('Error fetching data:', error.message);
              setMessage(error.message)
            }
          };
        fetchData();
    }, [id]);
  
   
    
    return (
        <div className=" ">
           {message}
        </div>
    );
}