import React, { useEffect, useState } from "react";
import gradeStructureService from "../../services/gradeStructure.service";

const TabGradeStructure = ({ id }) => {
    const [gradeStructure, setGradeStructure] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await gradeStructureService.getbyclassid(id);
                setGradeStructure(res.data.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {gradeStructure.length === 0 && <h1>No gradeStructure</h1>}
            {gradeStructure?.map((gradeStructure, index) => (
                <div key={index}>
                    <h1>{gradeStructure.name}</h1>
                    <h1>{gradeStructure.gradeScale}</h1>
                </div>
            ))}
        </div>
    );
};

export default TabGradeStructure;
