import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationService from "../services/notification.service";
import classService from "../services/class.service";
import { EnvelopeOpenIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

function Notification() {
    const [loadData, setLoadData] = useState(false);
    const [notice, setNotice] = useState([]);
    const [showNotices, setShowNotices] = useState([]);
    const [page, setPage] = useState(1);
    // const [isteacher, setIsteacher] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setLoadData(true);
        async function fetchNotice() {
            try {
                const res =
                    await notificationService.getNotificationByReceiverId(
                        user?.id
                    );
                setNotice(
                    res?.data?.sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                );
            } catch (error) {
                console.log(error);
                setNotice([]);
            }
            setLoadData(false);
        }
        fetchNotice();
        setShowNotices(notice.slice(0, 10));
    }, [user?.id]);

    useEffect(() => {
        setShowNotices(notice.slice(10 * (page - 1), 10 * page));
    }, [notice, page]);

    function handleClick(e, index) {
        e.preventDefault();
        const noticeIndex = 10 * (page - 1) + index;
        console.log(notice[noticeIndex]);
        async function updateStatus() {
            try {
                await notificationService.updatedStatus(
                    notice[noticeIndex].notificationId,
                    "read"
                );
            } catch (error) {
                console.log(error);
            }
        }
        async function coresponding() {
            let studentId = user?.id;
            try {
                const res = await classService.checkteacher(
                    notice[noticeIndex]?.classNotification?.id,
                    user?.id
                );
                const isteacher = res?.data?.data;
                if (isteacher) {
                    if (user?.id === notice[noticeIndex]?.userId) {
                        studentId = notice[noticeIndex]?.receiverId;
                    }
                    if (user?.id === notice[noticeIndex]?.receiverId) {
                        studentId = notice[noticeIndex]?.userId;
                    }
                }
                if (notice[noticeIndex]?.type === "gradereview") {
                    navigate(
                        `/class/gradereview/details?classId=${notice[noticeIndex]?.classNotification?.id}&assignmentId=${notice[noticeIndex]?.assignmentNotification?.assignmentId}&studentId=${studentId}`,
                        { relative: "path" }
                    );
                    window.location.reload();
                }
                if (notice[noticeIndex]?.type === "grade") {
                    navigate(
                        `/class/detail?id=${notice[noticeIndex]?.classNotification?.id}`,
                        { relative: "path", state: { activeTab: "assignment" } }
                    );
                    window.location.reload();
                }
                console.log("errr");
            } catch (error) {
                console.log(error);
            }
        }
        updateStatus();
        coresponding();
    }

    return (
        <div className="mx-4 mt-4">
            {loadData && (
                <div className="mx-auto text-center">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}
            {!loadData && (
                <>
                    <div className="text-3xl text-dark-green font-bold mb-4">
                        Notification
                    </div>
                    {notice?.length === 0 && (
                        <div className="text-base mt-2 ml-4 italic">
                            You have no notification
                        </div>
                    )}
                    {showNotices?.length > 0 && (
                        <div className="mt-2 mx-4">
                            {showNotices?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        handleClick(e, index);
                                    }}
                                    className={`pr-3 pl-4 py-3.5  ${
                                        index === 0 ? "border-t" : "border-t-0"
                                    } border-b border-r border-l border-dark-green flex flex-row  items-center hover:cursor-pointer hover:bg-light-green hover:bg-opacity-50`}
                                >
                                    {item.status === "unread" && (
                                        <EnvelopeIcon className="flex-none w-7 h-7 mr-2 text-dark-green" />
                                    )}
                                    {item.status === "read" && (
                                        <EnvelopeOpenIcon className="flex-none w-7 h-7 mr-2 text-dark-green" />
                                    )}
                                    <div className="ml-2 grow">
                                        <div className="text-lg font-semibold break-words">
                                            {item.title}
                                        </div>
                                        <div className="text-xs break-words text-neutral-700">
                                            {item.content}
                                        </div>
                                    </div>
                                    <div className="ml-3 flex-none text-xxs italic text-neutral-500">
                                        {item.createdAt.slice(0, 10)}
                                    </div>
                                </div>
                            ))}
                            <div className="text-right mt-3 flex flex-row gap-x-1 justify-end items-end">
                                <button
                                    className={`w-20 py-1.5 text-gray-800 border border-dark-green ${
                                        page !== 1 && "hover:bg-medium-green"
                                    }  rounded-lg text-xs mt-3 mr-1`}
                                    disabled={page === 1}
                                    onClick={() => {
                                        setPage(page - 1);
                                    }}
                                >
                                    Previous
                                </button>
                                <div className="mx-1.5 text-base text-neutral-600 italic">
                                    {page}/{Math.ceil(notice.length / 10)}
                                </div>
                                <button
                                    className={`w-20 py-1.5 text-gray-800 border border-dark-green ${
                                        page !==
                                            Math.ceil(notice.length / 10) &&
                                        "hover:bg-medium-green"
                                    }  rounded-lg text-xs mt-3 mr-1`}
                                    disabled={
                                        page === Math.ceil(notice.length / 10)
                                    }
                                    onClick={() => {
                                        setPage(page + 1);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Notification;
