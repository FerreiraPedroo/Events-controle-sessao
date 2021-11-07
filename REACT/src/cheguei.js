import { useContext } from "react";
import { PageContext } from "./context/context";
import { routes } from "./route/route.js";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import "./styles/cheguei.css"

import AdminNavbar from "./components/AdminNavbar/AdminNavbar"
import UserNavbar from "./components/UserNavbar/UserNavbar.js";

function ChegueiDigital() {
  const useLoc = useLocation();
  const { loged, setLoged } = useContext(PageContext);
  const { userLevel, setUserLevel } = useContext(PageContext);

  const NavBarRoute = () => {
    if (loged && userLevel === 0) return <UserNavbar key="UserNavbar" />
    if (loged && userLevel === 1) return <AdminNavbar key="AdminNavbar" />
    return (<></>)
  }
  const AllRoute = ({ component: Component, path }) => {
    console.log("LOGED: ", loged, "USERLEVEL: ", userLevel, "ROUTES.LEVEL :", routes[useLoc.pathname].level, "USELOC.PATHNAME: ", useLoc.pathname)

    // ROTA DO USUARIO
    if (loged && userLevel === 0 && routes[useLoc.pathname].level === 0) {
      return (<Route path={path} render={props => <> <NavBarRoute /><Component {...props} /></>} />)
    } else if (loged && userLevel === 0 && routes[useLoc.pathname].level === 1) {
      return (<Redirect to="/" />)
    }
    // ROTA DO ADMINISTRADOR
    if (loged && userLevel === 1 && routes[useLoc.pathname].level === 1) {
      return (<Route path={path} render={props => <> <NavBarRoute /><Component {...props} /></>} />)
    } else if (loged && userLevel === 1 && routes[useLoc.pathname].level === 0) {
      return (<Redirect to="/" />)
    }

    // ROTA HIBRIDA
    if (routes[useLoc.pathname].level === 2) {
      if (loged && userLevel === 0) return <Redirect to="/home" />
      if (loged && userLevel === 1) return <Redirect to="/admin/home" />
      return (<Route path={path} render={props => <> <NavBarRoute /><Component {...props} /></>} />)

    }

    // ROTA NÃO LOGADO
    if (!loged) {
      return (<Redirect to="/" />)
    }

  };

  return (
    <Switch>
      <AllRoute
        component=
        {
          routes.hasOwnProperty(useLoc.pathname) ? routes[useLoc.pathname].component : routes["/"].component
        }
        path=
        {
          routes.hasOwnProperty(useLoc.pathname) ? routes[useLoc.pathname].path : "/"
        }
      exact
      />

      <Redirect to="/" />

    </Switch>
  );
}

export default ChegueiDigital;