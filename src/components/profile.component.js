import React, { Component } from "react";
import {Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  List,
  Button,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton 
  
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { SimpleNavbar } from "./simplenavbar.component";
export function SimpleCard() {
  return (
    <Card className="mt-6 w-96 h-auto">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
    </Card>
  );
}

export function SimpleSidebar() {
  return (
    <Card className="min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Link to={"/"} className=" text-gray-900 ">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        </Link>
        <Link to={"/profile"} className=" text-gray-900 rounded-2xl bg-slate-200">
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>
 
      </List>
    </Card>
  );
}
export default class Profile extends Component {
 
  
  render() {
    const user=localStorage.getItem("user");
    if (user==null){
      return(
          <Navigate replace to="/" />
      )
    }
    return (
    <>
      <div className=" ">
          
       
          <div className="grid place-items-center items-center place-content-centers content-center gap-4">
          <Link to={"/edituser"} className=" text-gray-900 hover:none">
        <button  className="rounded-md text-gray-900 px-3 py-2 text-sm font-semibold shadow-sm bg-green-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit Profile
        </button>
        </Link>
            </div>
         
      </div>
    </>
    );
  }
}