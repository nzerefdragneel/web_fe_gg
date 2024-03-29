import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { appRouters } from "../routes/route.config";
import notificationService from "../services/notification.service";

function SidesMenu(props) {
    const { collapsed } = props;
    const [noticeCount, setNoticeCount] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function fetchNotice() {
            try {
                const res =
                    await notificationService.getNotificationByReceiverId(
                        user?.id
                    );
                setNoticeCount(
                    res?.data?.filter((x) => x.status === "unread").length
                );
            } catch (error) {
                console.log(error);
                setNoticeCount(0);
            }
        }
        fetchNotice();
    }, [user?.id]);

    return (
        <div
            className={`h-full ${
                collapsed ? "w-16" : "w-64"
            } transition-all ease-in-out duration-300  w-full max-w-[20rem] border-r-2 border-gray-200 -pt-2 -pb-2 -z-10`}
        >
            <div className="pt-5">
                {/* <div className={`${collapsed ? "p-2" : "p-8"} text-center`}>
          <Link to="/">
            <span className="text-white text-2xl font-bold">Logo</span>
          </Link>
        </div> */}
                <ul className="pt-5">
                    {appRouters
                        .filter((item) => item.showInMenu)
                        .map((route) => (
                            <li key={route.path} className="p-2">
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `flex items-center ${
                                            collapsed ? "pl-2" : "pl-8"
                                        } ${
                                            isActive
                                                ? "text-sky-500 text-gray-900  rounded-2xl bg-slate-200 p-2"
                                                : "text-gray-400 hover:text-sky-500 p-2"
                                        }`
                                    }
                                >
                                    <span className="mr-2 text-base">
                                        {route.icon && (
                                            <route.icon className="h-6 w-6" />
                                        )}
                                    </span>
                                    <span className="text-base grow">
                                        {route.name}
                                    </span>
                                    {route.name === "Notification" &&
                                        noticeCount > 0 && (
                                            <div>
                                                <span className="inline-flex items-center rounded-full bg-error-color px-2 py-1 text-xs font-bold text-light-green ring-1 ring-inset ring-gray-500/10 mr-1">
                                                    {noticeCount}
                                                </span>
                                            </div>
                                        )}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default SidesMenu;
