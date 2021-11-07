import Login from "../pages/Login/Login";

import AdminHome from "../pages/AdminHome/AdminHome";
import AdminEvent from "../pages/AdminEvent/AdminEvent";
import AdminUser from "../pages/AdminUser/AdminUser";
import RegisterUser from "../pages/AdminRegister/User/RegisterUser"
import RegisterEvent from "../pages/AdminRegister/Event/RegisterEvent";

import UserHome from "../pages/UserHome/UserHome";
import UserEvent from "../pages/UserEvent/UserEvent";




export const routes = {
    "/": {
        path: "/",
        component: Login,
        level: 2
    },
    "/home": {
        path: "/home",
        component: UserHome,
        level: 0
    },
    "/user/event": {
        path: "/user/event",
        component: UserEvent,
        level: 0
    },
    "/admin/home": {
        path: "/admin/home",
        component: AdminHome,
        level: 1
    },
    "/admin/user": {
        path: "/admin/user",
        component: AdminUser,
        level: 1
    },
    "/admin/event": {
        path: "/admin/event",
        component: AdminEvent,
        level: 1
    },
    "/admin/register/user": {
        path: "/admin/register/user",
        component: RegisterUser,
        level: 1
    },
    "/admin/register/event": {
        path: "/admin/register/event",
        component: RegisterEvent,
        level: 1
    },

}


// export const routes = [
//     // {
//     //     path: "/validate",
//     //     component: Validate,
//     //     title: title + "- Validate",
//     //     login: false,
//     // },
//     {
//         path: "/admin/register/user",
//         component: RegisterUser,
//         level: 1
//     },
//     {
//         path: "/admin/register/event",
//         component: RegisterEvent,
//         level: 1
//     },
//     {
//         path: "/admin/user",
//         component: UserPage,
//         level: 1
//     },
//     {
//         path: "/admin/event",
//         component: EventPage,
//         level: 1
//     },
//     {
//         path: "/admin/home",
//         component: AdminHome,
//         level: 1
//     },
//     {
//         path: "/home",
//         component: UserHome,
//         level: 0
//     },
//     {
//         path: "/",
//         component: Login,
//         level: 2
//     },
// ]



