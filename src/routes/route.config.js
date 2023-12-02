import Home from "../components/home.component"
import Profile from "../components/profile.component"
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon
} from "@heroicons/react/24/solid"

export const appRouters = [
  {
    path: "/home",
    title: "home",
    name: "Trang chủ",
    icon: HomeIcon,
    showInMenu: true,
    component: <Home/>
  },
  {
    path: "/profile",
    title: "profile",
    name: "Profile",
    icon: BookmarkIcon,
    showInMenu: true,
    component:<Profile/>
  }
]

export const routers = [...appRouters]
