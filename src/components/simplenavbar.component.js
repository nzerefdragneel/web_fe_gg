import {  Link } from "react-router-dom";
export function SimpleNavbar() {
    return (
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
      <Link to={"/"} className=" text-gray-900 hover:none">
          <button  className="rounded-md text-gray-900  px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Navbar
          </button>
      </Link>
      <Link to={"/edituser"} className=" text-gray-900 hover:none">
          <button  className="rounded-md text-gray-900  px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Profile
          </button>
      </Link>
          
      </div>
  </nav>
    );
  }