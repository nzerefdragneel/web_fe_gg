import Home from "../components/home.component";
import Profile from "../components/profile.component";
import Notification from "../components/notification.component";
import {
    BookmarkIcon,
    HomeIcon,
    BellAlertIcon,
} from "@heroicons/react/24/solid";

export const appRouters = [
    {
        path: "/home",
        title: "home",
        name: "Trang chủ",
        icon: HomeIcon,
        showInMenu: true,
        component: <Home />,
    },
    {
        path: "/profile",
        title: "profile",
        name: "Profile",
        icon: BookmarkIcon,
        showInMenu: true,
        component: <Profile />,
    },
    {
        path: "/notification",
        title: "notification",
        name: "Notification",
        icon: BellAlertIcon,
        showInMenu: true,
        component: <Notification />,
    },
];

export const routers = [...appRouters];
