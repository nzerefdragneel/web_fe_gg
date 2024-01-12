import { NavLink } from "react-router-dom";
import { appRoutersAdmin } from "../../routes/routeadmin.config";

export function SidesMenuAdmin(props) {
    const { collapsed } = props;
    return (
        <div
            className={`h-screen  ${
                collapsed ? "w-16" : "w-64"
            } transition-all ease-in-out duration-300  w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5`}
        >
            <div className="mt-5">
                <ul className="mt-5">
                    {appRoutersAdmin
                        .filter((item) => item.showInMenu)
                        .map((route) => (
                            <li key={route.path} className="p-2">
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `flex items-center ${
                                            collapsed ? "pl-2" : "pl-8"
                                        } ${
                                            isActive
                                                ? "text-sky-500 text-gray-900  rounded-2xl bg-slate-200 p-2"
                                                : "text-gray-400 hover:text-sky-500 p-2"
                                        }`
                                    }
                                >
                                    <span className="mr-2 text-base">
                                        {route.icon && (
                                            <route.icon className="h-6 w-6" />
                                        )}
                                    </span>
                                    <span className="text-base">
                                        {route.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
