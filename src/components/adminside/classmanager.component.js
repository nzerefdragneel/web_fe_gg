import React, { useState, useEffect } from "react";
import classService from "../../services/class.service";
const TABLE_HEAD = ["Id", "Classname", "Description", "Status"];

export default function ClassManager() {
    const [classes, setClasses] = useState([]);
    const [currentpage, setcurrentpage] = useState(1);
    const [limit, setlimit] = useState(5);
    const [totalpage, settotalpage] = useState(1);
    const [total, settotal] = useState(0);
    const [message, setMessage] = useState("");
    const [ascending, setascending] = useState(true);
    const [search, setsearch] = useState("");
    const [loading, setloading] = useState(false);

    const fetchClasses = async () => {
        await classService
            .getAllClassesAdmin(currentpage, limit, ascending)
            .then((response) => {
                console.log(response);
                setClasses(response.data.classes);
                settotal(response.data.totalItems);
                settotalpage(response.data.totalPages);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });

        setloading(false);
    };
    const fetchClassesSearch = async () => {
        await classService
            .getAllClassesSearch(currentpage, limit, ascending, search)
            .then((response) => {
                console.log(response);
                setClasses(response.data.classes);
                settotal(response.data.totalItems);
                settotalpage(response.data.totalPages);
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        fetchClassesSearch();
    };
    const handleActive = (id, active) => {
        classService
            .updateactive(id, 1 - active)
            .then((response) => {
                console.log(response);
                setMessage(response.data.message);
                setClasses(
                    classes.map((classes) => {
                        if (classes.id === id) {
                            classes.active = 1 - active;
                        }
                        return classes;
                    })
                );
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    };
    useEffect(() => {
        setloading(true);
        fetchClasses();
    }, [currentpage, limit, ascending]);
    const onsortchange = () => {
        setascending(!ascending);
    };
    return (
        <div className="flex flex-wrap flex-col ">
            {loading && (
                <div className=" mx-auto text-center mt-4">
                    <span className="spinner-border spinner-border-lg text-dark-green"></span>
                </div>
            )}
            {!loading && (
                <>
                    <div className="page-header">
                        <div className="">
                            <div className="flex flex-col grow max-w-full px-4">
                                <h3 className="mb-3 float-left mt-2 text-dark-green">
                                    Manager Class
                                </h3>
                                <div className="mt-3 justify-center flex flex-row">
                                    <form
                                        class="flex items-center max-w-3xl grow"
                                        onSubmit={handlesubmit}
                                    >
                                        <label
                                            for="simple-search"
                                            class="sr-only"
                                        >
                                            Search
                                        </label>
                                        <div class="relative w-full">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    class="w-4 h-4 text-gray-500 "
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                value={search}
                                                onChange={(e) =>
                                                    setsearch(e.target.value)
                                                }
                                                type="text"
                                                id="simple-search"
                                                class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
                                                placeholder="Search class name..."
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            class="p-2.5 ms-2 text-sm font-medium text-white bg-dark-green rounded-lg border border-dark-green hover:bg-medium-green focus:ring-4 focus:outline-none focus:ring-blue-300 "
                                        >
                                            <svg
                                                class="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                            <span
                                                class="sr-only"
                                                onClick={handlesubmit}
                                            >
                                                Search
                                            </span>
                                        </button>
                                    </form>
                                    <select
                                        id="sort"
                                        onChange={onsortchange}
                                        class="ml-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 items-end"
                                    >
                                        <option value="true" selected>
                                            Ascending
                                        </option>
                                        <option value="false">
                                            Descending
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-full pr-4 pl-4 mt-5">
                        <div className="flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card card-table">
                            <div className="flex-auto p-6 card-body booking_card">
                                <div className="block  scrolling-touch">
                                    <table className="datatable max-w-60 bg-transparent overflow-scroll snap-both scroll-auto table-stripped table-hover table-center mb-0 table">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map((head) => (
                                                    <th key={head}>{head}</th>
                                                ))}
                                                <th className="text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classes != null &&
                                                classes.map((classes) => {
                                                    return (
                                                        <tr key={classes.id}>
                                                            <td>
                                                                {classes.id}
                                                            </td>
                                                            <td>
                                                                {
                                                                    classes.className
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    classes.description
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className="actions">
                                                                    {classes.active ===
                                                                        1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleActive(
                                                                                    classes.id,
                                                                                    classes.active
                                                                                )
                                                                            }
                                                                            class="p-1 focus:outline-none text-white bg-dark-green hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  me-2 mb-2"
                                                                        >
                                                                            Active
                                                                        </button>
                                                                    )}
                                                                    {classes.active ===
                                                                        0 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleActive(
                                                                                    classes.id,
                                                                                    classes.active
                                                                                )
                                                                            }
                                                                            class="p-1 focus:outline-none text-white bg-error-color hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2"
                                                                        >
                                                                            Inactive
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="actions text-right">
                                                                    {" "}
                                                                    <a
                                                                        href={`classes/detail?id=${classes.id}`}
                                                                        className={`inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline py-1 px-2 leading-tight text-xs  ${"bg-success-light"} mr-2`}
                                                                    >
                                                                        Edit
                                                                    </a>{" "}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setcurrentpage(
                                                currentpage > 1
                                                    ? currentpage - 1
                                                    : currentpage
                                            )
                                        }
                                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Previous
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setcurrentpage(
                                                currentpage < totalpage
                                                    ? currentpage + 1
                                                    : currentpage
                                            )
                                        }
                                        className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
