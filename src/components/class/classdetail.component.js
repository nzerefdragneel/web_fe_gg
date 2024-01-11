import {
    Tabs,
    TabsHeader, // Add the missing import statement
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { TabNews } from "./tabnews.component";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import classService from "../../services/class.service";
import { TabEverybody } from "./tabEverybody.component";
import { TabGrade } from "./tabGrade.component";
import { TabAssignment } from "./tabAssignment.component";
import { StudentTabAssignment } from "./studentTabAssignment.component";
import { StudentTabGrade } from "./studentTabGrade.component";
import { TabGradeReview } from "./tabGradeReview.component";

export function ClassDetail() {
    const [activeTab, setActiveTab] = useState("news");
    const [isteacher, setIsteacher] = useState(false);
    const [classactive, setclassactive] = useState(1);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get("id");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const user = JSON.parse(localStorage.getItem("user"));

                // Assuming that checkteacher returns a promise
                const isteacher = await classService.checkteacher(
                    classId,
                    user.id
                );
                setIsteacher(isteacher.data.data);
                classService.getclassactive(classId).then(
                    (res) => {
                        if (res.status === 200) {
                            setclassactive(res.data.data);
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );

                if (isteacher.data.data === false) {
                    // Assuming that checkhavemssv returns a promise
                    try {
                        const havsmssv = await classService.checkhavemssv(
                            classId,
                            user?.id
                        );
                        console.log(havsmssv);

                        // Assuming that response.status should be checked here
                        if (havsmssv.status === 200) {
                            // Reload only if necessary
                            navigate(
                                `/updateStudentId?classId=${classId}&userId=${user.id}`
                            );
                            window.location.reload();
                        }
                    } catch (error) {
                        console.error(
                            "Error checking have mssv:",
                            error.message
                        );
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [classId]);

    return (
        <div className="">
            {loading && (
                <div className="mx-auto text-center mt-4">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}
            {!loading && classactive === 1 && (
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 text-base m-1 px-1 flex flex-row right-0 "
                        indicatorProps={{
                            className:
                                "bg-transparent  border-gray-900 shadow-none rounded-none flex flex-row right-0",
                        }}
                    >
                        <Tab
                            key="news"
                            value="news"
                            onClick={() => setActiveTab("news")}
                            className={
                                activeTab === "news"
                                    ? "text-gray-900 rounded-tr-md rounded-tl-md border-slate-900 font-semibold border-b-4"
                                    : ""
                            }
                        >
                            News
                        </Tab>
                        <Tab
                            key="assignment"
                            value="assignment"
                            onClick={() => setActiveTab("assignment")}
                            className={
                                activeTab === "assignment"
                                    ? "text-gray-900 rounded-tr-md rounded-tl-md border-slate-900 font-semibold border-b-4"
                                    : ""
                            }
                        >
                            Grade Structure
                        </Tab>
                        {isteacher && (
                            <Tab
                                key="reviewList"
                                value="reviewList"
                                onClick={() => setActiveTab("reviewList")}
                                className={
                                    activeTab === "reviewList"
                                        ? "text-gray-900 rounded-tr-md rounded-tl-md border-slate-900 font-semibold border-b-4"
                                        : ""
                                }
                            >
                                Grade Review Request List
                            </Tab>
                        )}
                        <Tab
                            key="everybody"
                            value="everybody"
                            onClick={() => setActiveTab("everybody")}
                            className={
                                activeTab === "everybody"
                                    ? "text-gray-900 rounded-tr-md rounded-tl-md border-slate-900 font-semibold border-b-4"
                                    : ""
                            }
                        >
                            EveryBody
                        </Tab>
                        <Tab
                            key="grade"
                            value="grade"
                            onClick={() => setActiveTab("grade")}
                            className={
                                activeTab === "grade"
                                    ? "text-gray-900 rounded-tr-md rounded-tl-md border-slate-900 font-semibold border-b-4"
                                    : ""
                            }
                        >
                            Grade
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel key="news" value="news">
                            <TabNews id={classId}></TabNews>
                        </TabPanel>
                        <TabPanel key="assignment" value="assignment">
                            {isteacher ? (
                                <TabAssignment id={classId}></TabAssignment>
                            ) : (
                                <StudentTabAssignment
                                    id={classId}
                                ></StudentTabAssignment>
                            )}
                        </TabPanel>
                        {isteacher && (
                            <TabPanel key="reviewList" value="reviewList">
                                <TabGradeReview id={classId}></TabGradeReview>
                            </TabPanel>
                        )}
                        <TabPanel key="everybody" value="everybody">
                            <TabEverybody id={classId}></TabEverybody>
                        </TabPanel>
                        <TabPanel key="grade" value="grade">
                            {isteacher ? (
                                <TabGrade id={classId}></TabGrade>
                            ) : (
                                <StudentTabGrade id={classId}></StudentTabGrade>
                            )}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            )}
            {!loading && classactive === 0 && (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-3xl font-semibold text-gray-700">
                        This class is not active
                    </div>
                    <div className="text-xl font-semibold text-gray-700">
                        Please contact your teacher
                    </div>
                    <div className="text-xl font-semibold text-gray-700">
                        Or contact admin
                    </div>
                </div>
            )}
        </div>
    );
}
