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

export function ClassDetail() {
  const [activeTab, setActiveTab] = useState("news");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classId = queryParams.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log("oke");
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // Assuming that checkteacher returns a promise
        const isteacher = await classService.checkteacher(classId, user.id);
        console.log(isteacher);

        if (isteacher.data.data === false) {
          // Assuming that checkhavemssv returns a promise
          try {
            const havsmssv = await classService.checkhavemssv(classId, user.id);
            console.log(havsmssv);

            // Assuming that response.status should be checked here
            if (havsmssv.status === 200) {
              // Reload only if necessary
              navigate(`/updateStudentId?classId=${classId}&userId=${user.id}`);
              window.location.reload();
            }
          } catch (error) {
            console.error("Error checking havemssv:", error.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [classId]);
  return (
    <div className="">
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
            Assignment
          </Tab>
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
            <TabAssignment id={classId}></TabAssignment>
          </TabPanel>
          <TabPanel key="everybody" value="everybody">
            <TabEverybody id={classId}></TabEverybody>
          </TabPanel>
          <TabPanel key="grade" value="grade">
            <TabGrade id={classId}></TabGrade>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
