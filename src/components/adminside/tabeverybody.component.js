
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from "react-router-dom";
import classService from '../../services/class.service';
const TABLE_HEAD = ["User Id",
"Enroll Date",
"Student Id",
"Fullname"];

export function TabEverybodyManager() {
    const [Student, setStudent] = useState([]);
    const [currentpage,setcurrentpage] = useState(1);
    const [limit,setlimit] = useState(5);
    const [totalpage,settotalpage] = useState(1);
    const [total,settotal]=useState(0);
    const [message, setMessage] = useState("");
    const [ascending, setascending] = useState(true);
    const [search,setsearch] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get("id");
    const fetchStudent = async () => {
      await classService.getAllStudentAdmin(classId,currentpage,limit,ascending)
      .then((response) => {
        console.log(response);
        setStudent(response.data.data.classes);
        settotal(response.data.data.totalItems);
        settotalpage(response.data.data.totalPages);

        console.log(Student);
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
     const fetchStudentSearch = async () => {
      await classService.getAllStudentSearch(currentpage,limit,ascending,search)
      .then((response) => {
        console.log(response);
        setStudent(response.data.Student);
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
    const handlesubmit = (e) => {
      e.preventDefault();
      fetchStudentSearch();
    }
    const handleActive= (id,active) => {
      classService.updateactive(id,1-active)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setStudent(Student.map((Student) => {
          if (Student.id === id) {
            Student.active = 1-active;
          }
          return Student;
        }));
      }
      ).catch((error) => {
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
          setMessage(resMessage);
      });

    }
    useEffect(() => {
        fetchStudent();
    }, [currentpage,limit,ascending]);
    const onsortchange = () => {
      setascending(!ascending);
    }
    return (
<div className="flex flex-wrap flex-col ">
      <div className="page-header">
        <div className="flex flex-wrap items-center">
          <div className=" flex-grow max-w-full flex-1 px-4">
            <div className="mt-3">
              <h4 className="mb-3 float-left mt-2">Manager Student In Class</h4>
              <form class="flex items-center max-w-3xl" onSubmit={handlesubmit}>   
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                          </svg>
                      </div>
                      <input value={search} onChange={(e) => setsearch(e.target.value)}
                          type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required/>
                  </div>
                  <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                      <span class="sr-only" onClick={handlesubmit}>Search</span>
                  </button>
              </form>
              <select id="sort" onChange={onsortchange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="true" selected>Ascending</option>
                <option value="false">Descending</option>
             </select>
             
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
                {Student != null && Student.map((Student) => {
                return (
                    <tr key={Student.studentId}>
                      <td>{Student.studentId}</td>
                      <td>{Student.enrollmentDate}</td>
                      <td>{Student.mssv}</td>
                      <td>{Student.studentenrollment.fullname}</td>
                      <td><div className="actions">
                        {Student.studentenrollment.active===1&&
                      <button type="button" onClick={() => handleActive(Student.id, Student.active)} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Active</button>
                        }
                        {Student.active===0&&
                        <button type="button"  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Inactive</button>}
                        </div>
                        </td>
                     
                      <td>
                        <div className="actions">
                        {Student.mssv===null&&
                      <button type="button" onClick={() => handleActive(Student.id, Student.active)} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Map ID</button>
                        }
                        {Student.active!==null&&
                        <button type="button"  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Unmap ID</button>}
                      
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