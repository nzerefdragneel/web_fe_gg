import ClassManager from "../components/adminside/classmanager.component"
import ManagerUser from "../components/adminside/manageruser.component"
import Home from "../components/home.component"
import Profile from "../components/profile.component"
import {
  BookmarkIcon,
  HomeIcon,
} from "@heroicons/react/24/solid"

export const appRoutersAdmin = [
  {
    path: "/manageuser",
    title: "manage user",
    name: "Manage User",
    icon: HomeIcon,
    showInMenu: true,
    component: <ManagerUser/>
  },
  {
    path: "/profile",
    title: "profile",
    name: "Profile",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<Profile/>
  },
  {
    path: "/classmanager",
    title: "class manager",
    name: "Class Manager",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<ClassManager/>
  }
]

export const routersAdmin = [...appRoutersAdmin]
