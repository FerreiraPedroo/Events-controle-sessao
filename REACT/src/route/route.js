import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

import RegisterUser from "../pages/Register/User/RegisterUser"
import RegisterEvent from "../pages/Register/Event/RegisterEvent";

//Chegguital
const title = "ChegueiDigital";

export const routes = [
    // {
    //     path: "/validate",
    //     component: Validate,
    //     title: title + "- Validate",
    //     login: false,
    // },
    {
        path: "/admin/register/user",
        component: RegisterUser,
        title: title + "- RegisterUser",

    },
    {
        path: "/admin/register/event",
        component: RegisterEvent,
        title: title + "- RegisterEvent",

    },
    {
        path: "/home",
        component: Home,
        title: title + "- Inicio",
    },
    {
        path: "/",
        component: Login,
        title: title + "- Login"
    },
]
