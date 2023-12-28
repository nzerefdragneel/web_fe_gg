import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import {
    PlusIcon,
    PencilSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import gradeService from "../../services/grade.service";

const SortableItem = SortableElement(
    ({ value, handleDelete, handleUpdate }) => (
        <div className="flex flex-col  p-2 justify-end shadow-md w-full bg-slate-50  rounded my-2">
            <Card className="h-auto shadow-none  bg-slate-50">
                <div className="flex justify-end pt-2 z-10 items-center">
                    <PencilSquareIcon
                        className="w-5 h-5 text-neutral-700 font-bold hover:text-dark-green cursor-pointer mr-1"
                        onClick={(e) => {
                            handleUpdate(e, value);
                        }}
                    />
                    <XMarkIcon
                        className="w-6 h-6 text-neutral-700 hover:text-error-color cursor-pointer mr-1"
                        onClick={(e) => {
                            handleDelete(e, value);
                        }}
                    />
                </div>
                <CardBody className="grid grid-cols-2 place-items-center -mt-5 p-3">
                    <Typography variant="paragraph" className="italic my-0">
                        Grade composition name:
                        <Link
                            // to={`/class/detail?id=${id.id}&assignmentId=${item.assignmentId}`}
                            className=" text-gray-900  hover:text-dark-green"
                        >
                            <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                                {value?.name}
                            </div>
                        </Link>
                    </Typography>

                    <Typography
                        variant="paragraph"
                        className="italic text-gray-900 my-0 mr-0"
                    >
                        Scale:
                        <div className="text-2xl text-dark-green font-bold mt-1 not-italic ml-2">
                            {value?.scale}%
                        </div>
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
);

const SortableList = SortableContainer(
    ({ items, handleDelete, handleUpdate }) => {
        return (
            <ul>
                {items?.map((value, index) => (
                    <SortableItem
                        key={value.assignmentId}
                        index={index}
                        value={value}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                ))}
            </ul>
        );
    }
);

export function TabAssignment({ id }) {
    const [listGrade, setListGrade] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await gradeService.getGradeByClassId(id);
                setListGrade(
                    res?.data?.data?.sort((a, b) => a.position - b.position)
                );
                setMessage("");
            } catch (error) {
                console.error("Error fetching data");
                setMessage("Error fetching data");
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        async function updatePosition(gradeId, position) {
            try {
                const res = await gradeService.updatedPostion(
                    gradeId,
                    position
                );
                if (res.status === 201) {
                    console.log("update success");
                }
            } catch (error) {
                console.error("Error fetching data");
                console.log(error);
            }
        }
        listGrade?.forEach((item, index) => {
            updatePosition(item.assignmentId, index + 1);
        });
    }, [listGrade]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (listGrade.length === 0) return;
        if (oldIndex === newIndex) {
            return;
        }
        setListGrade(arrayMove(listGrade, oldIndex, newIndex));
    };

    function handleDelete(e, value) {
        e.preventDefault();
        async function deleteGrade() {
            try {
                const res = await gradeService.deleteGrade(value.assignmentId);
                if (res.status === 201) {
                    alert("Delete Grade Success");
                    setListGrade(
                        listGrade.filter(
                            (item) => item.assignmentId !== value.assignmentId
                        )
                    );
                }
            } catch (error) {
                alert("Delete Grade Fail");
                console.error("Error fetching data");
                console.log(error);
            }
        }

        if (
            window.confirm(
                "Are you sure you want to delete this grade composition?"
            )
        ) {
            deleteGrade();
        } else {
            return;
        }
    }

    function handleUpdate(e, value) {
        e.preventDefault();
        console.log(value);
    }

    return (
        <div className=" ">
            <div className="flex flex-row justify-end pr-8">
                <Link
                    to={`/class/grade/create?id=${id}`}
                    className=" text-gray-900 hover:no-underline"
                >
                    <button className="bg-dark-green hover:bg-medium-green  hover:text-black text-white font-bold py-2 px-4 rounded-full flex items-center">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Create a grade composition
                    </button>
                </Link>
            </div>
            <div className="grid grid-flow-row-dense gap-2 mx-40 my-4">
                {listGrade.length === 0 && (
                    <div className="text-gray-900 text-center">
                        No assignment found.
                    </div>
                )}
                {listGrade.length !== 0 && (
                    <SortableList
                        items={listGrade}
                        onSortEnd={onSortEnd}
                        distance={1}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                )}
                {message && (
                    <div className="text-red-500 text-center">{message}</div>
                )}
            </div>
        </div>
    );
}
