import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import {
    PlusIcon,
    PencilSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
                            to={`/class/assignments?id=${value.classId}&assignmentId=${value.assignmentId}`}
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

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                This field is required!
            </div>
        );
    }
};

const checkScale = (value) => {
    if (value < 0) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be greater than 0!
            </div>
        );
    }
    if (value > 100) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be less than 100!
            </div>
        );
    }
    if (value.includes(".")) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be integer!
            </div>
        );
    }
    if (Number.isInteger(parseInt(value)) === false) {
        return (
            <div className="text-error-color text-base" role="alert">
                Scale must be integer!
            </div>
        );
    }
};

export function TabAssignment({ id }) {
    const [listGrade, setListGrade] = useState([]);
    const [message, setMessage] = useState("");
    const [openUpdate, setOpenUpdate] = useState(false);
    const [gradeName, setGradeName] = useState("");
    const [scale, setScale] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [gradeUpdate, setGradeUpdate] = useState({});
    const [loading, setLoading] = useState(false);

    const cancelButtonRef = useRef(null);
    const fref = useRef(null);

    const notifyUpdateSusscess = () => toast.success("Update Grade Success!");
    const notifyUpdateFail = () => toast.error("Update Grade Fail!");
    const notifyDeleteSusscess = () => toast.success("Delete Grade Success!");
    const notifyDeleteFail = () => toast.error("Delete Grade Fail!");

    useEffect(() => {
        setLoading(true);
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
            setLoading(false);
        };
        fetchData();
    }, [id, isSubmit]);

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
                    notifyDeleteSusscess();
                    setListGrade(
                        listGrade.filter(
                            (item) => item.assignmentId !== value.assignmentId
                        )
                    );
                }
            } catch (error) {
                notifyDeleteFail();
                console.error("Error fetching data");
                console.log(error);
            }
        }

        if (
            window.confirm(
                `Are you sure you want to delete grade composition ${value?.name}?`
            )
        ) {
            deleteGrade();
        } else {
            return;
        }
    }

    function handleUpdate(e, value) {
        e.preventDefault();
        setGradeUpdate(value);
        setOpenUpdate(true);
    }

    function handleSubmit(e) {
        setIsSubmit(false);
        e.preventDefault();
        if (fref.current) {
            fref.current.validateAll();
        }
        async function updateGrade() {
            try {
                if (
                    Number.isInteger(parseInt(scale)) &&
                    !scale?.includes(".")
                ) {
                    gradeService
                        .updateNameScale(
                            gradeName,
                            scale,
                            gradeUpdate.assignmentId
                        )
                        .then(
                            (res) => {
                                if (res.status === 201) {
                                    notifyUpdateSusscess();
                                    setIsLoading(false);
                                    setOpenUpdate(false);
                                    setGradeName("");
                                    setGradeUpdate({});
                                    setIsSubmit(true);
                                }
                            },
                            (error) => {
                                notifyUpdateFail();
                                setIsSubmit(true);
                                console.log(error);
                                setIsLoading(false);
                                setMessage("Update Grade Fail");
                            }
                        );
                } else {
                    console.log("scale must be integer");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setIsLoading(false);
            }
        }
        if (
            scale === "" ||
            gradeName === "" ||
            !Number.isInteger(parseInt(scale)) ||
            scale?.includes(".") ||
            scale < 0 ||
            scale > 100
        ) {
            notifyUpdateFail();
            setIsLoading(false);
            return;
        }
        updateGrade();
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
                        <span className="hover:text-black">
                            Create a grade composition
                        </span>
                    </button>
                </Link>
            </div>
            <div className="grid grid-flow-row-dense gap-2 mx-40 mt-4">
                {loading && (
                    <div className="place-items-center mx-auto col-span-2">
                        <span className="spinner-border spinner-border-lg text-dark-green"></span>
                    </div>
                )}
                {!loading && listGrade.length === 0 && (
                    <div className="text-xl font-semibold text-center text-dark-green">
                        Class haven't any Grade Composition
                    </div>
                )}
                {!loading && listGrade?.length !== 0 && (
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
            <Transition.Root show={openUpdate} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpenUpdate}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-2 pt-6 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start flex justify-center mx-4">
                                            <Form
                                                onSubmit={handleSubmit}
                                                ref={fref}
                                                className="w-full"
                                            >
                                                <div>
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="gradename"
                                                            className="font-semibold mb-2"
                                                        >
                                                            Grade Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            className="form-control p-3 rounded required"
                                                            name="gradename"
                                                            placeholder={
                                                                gradeUpdate?.name
                                                                    ? gradeUpdate.name
                                                                    : "Enter your Grade Composition Name"
                                                            }
                                                            onChange={(e) => {
                                                                setGradeName(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            validations={[
                                                                required,
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="scale"
                                                            className="font-semibold mb-2 mt-2"
                                                        >
                                                            Grade Scale(%)
                                                        </label>
                                                        <Input
                                                            type="number"
                                                            className="form-control p-3 rounded"
                                                            name="scale"
                                                            placeholder={
                                                                gradeUpdate?.scale
                                                                    ? gradeUpdate.scale
                                                                    : "Enter your Grade Composition Scale"
                                                            }
                                                            onChange={(e) => {
                                                                setScale(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            validations={[
                                                                required,
                                                                checkScale,
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpenUpdate(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-dark-green px-3 py-2 text-sm font-semibold text-white hover:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-medium-green sm:ml-3 sm:w-auto"
                                            onClick={(e) => {
                                                setIsLoading(true);
                                                handleSubmit(e);
                                            }}
                                        >
                                            {isLoading && (
                                                <span className="spinner-border spinner-border-sm mr-1"></span>
                                            )}
                                            Confirm
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastContainer />
        </div>
    );
}
