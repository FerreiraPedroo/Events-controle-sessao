import { useContext} from "react";
import { PageContext } from "./context/context";
import { routes } from "./route/route.js";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import "./styles/cheguei.css"

import Navbar from "./components/Navbar/Navbar"
import Leftbar from "./components/Leftbar/Leftbar.js";

function ChegueiDigital() {
  const useLoc = useLocation();
  const { loged, setLoged } = useContext(PageContext);

  return (
    <Switch>
      {
        routes.map((route) => {
          const Component = route.component;
          return (
            <Route key={route.path} path={route.path} exact >
              {
                route.path === "/" && useLoc.pathname === "/" && loged ? <Redirect to="/home" /> : ""
              }

              {
                route.path !== "/" && useLoc.pathname !== "/" && !loged ? <Redirect to="/" /> : ""
              }

              <div className="path-container">
                {
                  route.path !== "/" ? <Navbar /> : ""
                }
                <div className="path-container-center">
                  {/* {
                    route.path !== "/" ? <Leftbar /> : ""
                  } */}
                  <Component />
                </div>
              </div>

            </Route>
          )
        })
      }
      <Redirect to="/" />
    </Switch>
  );
}

export default ChegueiDigital;
