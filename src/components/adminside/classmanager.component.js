
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classService from '../../services/class.service';
const TABLE_HEAD = ["Id",
"Classname",
"Description",
"Created At",
"Status"];

export default function ClassManager() {
    const [classes, setClasses] = useState([]);
    const [currentpage,setcurrentpage] = useState(1);
    const [limit,setlimit] = useState(5);
    const [totalpage,settotalpage] = useState(1);
    const [total,settotal]=useState(0);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchClasses = async () => {
            await classService.getAllClassesAdmin(currentpage,limit)
            .then((response) => {
              console.log(response);
              setClasses(response.data.classes);
              settotal(response.data.totalItems);
              settotalpage(response.data.totalPages);
            }).catch((error) => {
              const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
                setMessage(resMessage);
            });
        }
        fetchClasses();
    }, [currentpage,limit]);
  
    return (
<div className="flex flex-wrap flex-col ">
      <div className="page-header">
        <div className="flex flex-wrap items-center">
          <div className=" flex-grow max-w-full flex-1 px-4">
            <div className="mt-3">
              <h4 className="mb-3 float-left mt-2">Manager Class</h4>
              {/* <NavLink
                to="/staff/add"
                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 float-right veiwbutton"
              >
                Add User
              </NavLink> */}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:w-full pr-4 pl-4">
        <div className="flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 card card-table">
          <div className="flex-auto p-6 card-body booking_card">
            <div className="block  scrolling-touch">
              <table className="datatable max-w-60 bg-transparent overflow-scroll snap-both scroll-auto table-stripped table-hover table-center mb-0 table">
                <thead>
                  <tr>
                  {TABLE_HEAD.map((head) => (
                        <th key={head}>
                            {head}
                            
                        </th>
                    ))}
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {classes != null && classes.map((classes) => {
                return (
                    <tr key={classes.id}>
                      <td>{classes.id}</td>
                      <td>{classes.className}</td>
                      <td>{classes.description}</td>
                      <td>{classes.createdAt}</td>
                      <td><div className="actions">
                          {' '}
                          <div
                            className={`inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline py-1 px-2 leading-tight text-xs  ${
                                classes.is_active  ? 'bg-success-light' : 'bg-danger-light'
                            } mr-2`}
                          >
                           {classes.active ? 'Active' : 'Inactive'}
                          </div>{' '}
                        </div></td>
                     
                      <td>
                        <div className="actions">
                          {' '}
                          <a
                            href={`classes/detail?id=${classes.id}`} 
                            className={`inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline py-1 px-2 leading-tight text-xs  ${
                               'bg-success-light' 
                            } mr-2`}
                          >
                          Edit
                          </a>{' '}
                        </div>
                      </td>
                    </tr>
                   );
                })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => setcurrentpage(currentpage>1?currentpage -1:currentpage)}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </button>

              <button
               type='button'
               onClick={() => setcurrentpage(currentpage<totalpage?currentpage +1:currentpage)}
                className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}