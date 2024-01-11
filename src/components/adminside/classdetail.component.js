import {
    Tabs,
    TabsHeader, // Add the missing import statement
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TabEverybodyManager } from "./tabeverybody.component";
import { TabNewsManager } from "./tabnew.component";
export function ClassDetailManager() {
    const [activeTab, setActiveTab] = useState("news");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get("id");
    useEffect(() => {
        const fetchData = async () => {
            //some code
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
                </TabsHeader>
                <TabsBody>
                    <TabPanel key="news" value="news">
                        <TabNewsManager id={classId}></TabNewsManager>
                    </TabPanel>
                    <TabPanel key="assignment" value="assignment">
                        <h1>Assignment</h1>
                    </TabPanel>
                    <TabPanel key="everybody" value="everybody">
                        <TabEverybodyManager></TabEverybodyManager>
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
}
