
import { Classheader } from "./classheader.component";
import React, { useState, useEffect } from "react";
import classService from "../../services/class.service";
export function TabNews(id ) {

    const [classdetail, setClassdetail] = useState({});
    const [message,setMessage]=useState('');
   
    
      
    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await classService.getbyid(id.id);
              setClassdetail(res.data.data)
              console.log(res);
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }
          };
        fetchData();
    }, [id]);
  
   
    
    return (
        <div className=" ">
            <Classheader data={classdetail}></Classheader>
        </div>
    );
}