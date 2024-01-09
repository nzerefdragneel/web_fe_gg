import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import UserService from "../services/user.service";
import {
    Card,
    CardBody,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";
export function SimpleCard() {
    return (
        <Card className="mt-6 w-96 h-auto">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    UI/UX Review Check
                </Typography>
                <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2
                    min by walk and near to &quot;Naviglio&quot; where you can
                    enjoy the main night life in Barcelona.
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
                <Link
                    to={"/profile"}
                    className=" text-gray-900 rounded-2xl bg-slate-200"
                >
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
const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isloading, setIsloading] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        setIsloading(true);
        const fetchData = async () => {
            if (user == null) {
                setIsloading(false);
                return;
            }
            try {
                const response = await UserService.GetbyId(user?.id);
                setProfile(response?.data.user);
            } catch (error) {
                console.log(error);
            }
            setIsloading(false);
        };
        if (user != null) {
            fetchData();
        }
    }, [user?.id]);

    if (user == null) {
        return <Navigate replace to="/" />;
    }

    return (
        <>
            <div className=" ">
                <div className="flex flex-row justify-end pr-8">
                    <Link
                        to={"/edituser"}
                        className=" text-gray-900 hover:no-underline "
                    >
                        <button className="bg-dark-green hover:bg-medium-green hover:text-black text-white font-bold py-2 px-4 rounded-full flex items-center">
                            <PencilSquareIcon className="w-5 h-5 font-bold hover:text-dark-green cursor-pointer mr-1" />
                            Edit Profile
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col m-4 ">
                    <div className="text-6xl text-dark-green lg:ml-32 sm:ml-24 tracking-widest font-bold mt-3 z-10">
                        Profile
                    </div>
                    <div className=" mx-auto mt-2">
                        {isloading && (
                            <span className="spinner-border spinner-border-lg text-dark-green"></span>
                        )}
                    </div>
                    {!isloading && (
                        <div className="bg-slate-50 rounded-sm shadow-md -mt-8 px-8 pb-4 pt-12 grid grid-flow-row-dense lg:grid-cols-2 grid-cols-1 gap-x-0 gap-y-4 w-auto mx-20">
                            <div className=" lg:ml-12 uppercase text-dark-green">
                                Full Name:
                            </div>
                            <div className="break-words lg:text-left sm:text-right">
                                {profile?.fullname || (
                                    <span className="italic text-neutral-500">
                                        Not provided yet
                                    </span>
                                )}
                            </div>
                            <hr className="lg:col-span-2 text-light-green mx-auto w-11/12" />
                            <div className=" text-dark-green lg:ml-12 uppercase">
                                Username:
                            </div>
                            <div className="break-words lg:text-left sm:text-right">
                                {profile?.username || "Not provided yet"}
                            </div>
                            <hr className="lg:col-span-2 text-light-green mx-auto w-11/12" />
                            <div className=" text-dark-green lg:ml-12 uppercase">
                                Email:
                            </div>
                            <div className="break-words lg:text-left sm:text-right">
                                {profile?.email || "Not provided yet"}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
