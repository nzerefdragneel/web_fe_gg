import AppLayout from "../pages/layout"
import { appRouters } from "./route.config"

export default 
[
  {
    path: "/",
    element: <AppLayout />,
    children: appRouters.map(route => {
      return {
        path: route.path,
        element: <route.component />
      }
    })
  }
]
