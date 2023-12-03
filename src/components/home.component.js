import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
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
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";
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
        <Link to={"/"} className=" text-gray-900  rounded-2xl bg-slate-200">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        </Link>
        <Link to={"/profile"} className=" text-gray-900 hover:none">
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
export default class Home extends Component {
 

 
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
          <div className="grid grid-flow-row-dense grid-cols-2  m-4 ">
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard> 
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard>
          <SimpleCard></SimpleCard> 
          <SimpleCard></SimpleCard>
        
          </div>
      </div>
    </>
    );
  }
}