import DashBoard from "../components/Dashboard/DashBoard";
import Login from "../components/Login/Login";

const routes = [
    {
        path: '/',
        component: Login,
        exact: true,
        key: 'login'
    },
    {
        path: '/dashboard',
        component: DashBoard,
        exact: true,
        key: 'dashboard'
    },
]

export default routes;