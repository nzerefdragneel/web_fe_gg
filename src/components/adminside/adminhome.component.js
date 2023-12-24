import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

import classService from "../../services/class.service";


const AdminHome = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [classes, setClasses] = useState([]);
    async function getClass() {
        let classTemp = [];
        //get list class by teacher id
        const res = await classService.getClassByTeacherId(user.id);
        if (res.status === 200) {
            classTemp = classTemp.concat(res.data.data);
        }

        //get list class by student id
        const res1 = await classService.getClassByStudentId(user.id);
        if (res1.status === 200) {
            classTemp = classTemp.concat(res1.data.data);
        }
        return classTemp;
    }

    async function getClassById(classId) {
        const res = await classService.getbyid(classId);
        if (res.status === 200) {
            return res.data.data;
        }
    }

    async function getClassesInfo(classesTemp) {
        let classInfo = [];
        for (let i = 0; i < classesTemp.length; i++) {
            let info = await getClassById(classesTemp[i]?.classId)
            classInfo.push(info);
        }
        return classInfo;
    }

    useEffect(() => {
        async function f() {
            const classesTemp = await getClass();
            const classesInfo = await getClassesInfo(classesTemp);
            setClasses(classesInfo);
        }
        f()
    }, []);

    if (user == null) {
        return <Navigate replace to="/" />;
    }

    return (
        <>
            <div className=" ">
                <div className="flex flex-row justify-end pr-8">
                    <Link
                        to={"/class/create-class"}
                        className=" text-gray-900 hover:none"
                    >
                        <button className="bg-dark-green hover:bg-medium-green text-white font-bold py-2 px-4 rounded-full">
                            Tạo lớp
                        </button>
                    </Link>
                </div>
                <div className="grid grid-flow-row-dense grid-cols-2 gap-2 m-4 ">
                    {classes?.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col justify-end py-2 px-4 shadow-md w-full bg-slate-50">
                                <Card className="h-auto shadow-none  bg-slate-50">
                                    <CardBody>
                                        <Link
                                            to={`/class/detail?id=${item.id}`}
                                            className=" text-gray-900  hover:text-dark-green"
                                        >
                                            <div className="text-2xl text-dark-green font-bold mt-3">
                                                {item.className}
                                            </div>
                                        </Link>
                                        <Typography
                                            variant="small"
                                            className="mb-2 italic mt-2"
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default AdminHome;
