import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
/* import Home from "./containers/Home/index";
import Calendario from "./containers/Calendario/index";
import Reclamos from "./containers/reclamos/index";
import Reclamo from "./containers/reclamos/reclamo"; 
import Layout from "./containers/Layout/index";
import Client from "./containers/Client/Client";
import ClientSubAccount from "./containers/Client/ClientSubAccount/ClientSubAccount";
*/

//import Calendario from "./containers/Calendario/index";
import Signin from "./containers/Signin/index";
import withAuth from "./hoc/withAuth/index";
import Spinner from './components/Spinner/index'

const Home = lazy(() => import("./containers/Home/index"));
const Calendario = lazy(() => import("./containers/Calendario/index"));
const Reclamos = lazy(() => import("./containers/reclamos/index"));
const Reclamo = lazy(() => import("./containers/reclamos/reclamo"));
const Layout = lazy(() => import("./containers/Layout/index"));
const Client = lazy(() => import("./containers/Client/Client"));
const ClientSubAccount = lazy(() => import("./containers/Client/ClientSubAccount/ClientSubAccount"));




function App() {
  const isUserAuthenticated = useSelector((state) => state.auth.logged);

  return (
    <div>
      <Route
        exact
        path="/"
        render={() => {
          return isUserAuthenticated ? <Redirect to="/home" /> : <Redirect to="/" />;
        }}
      />
      <Suspense fallback={<div style={{position: 'absolute', left: '50%', top: '50%'}}><Spinner /></div>}>
        <Switch>
          <Route path="/" exact component={Signin} />
          <Layout>
            <Route path="/home" component={Home} />
            <Route path="/client" component={Client} />
            <Route path="/client_sub_account" component={ClientSubAccount} />
            <Route path="/calendario" component={Calendario} />
            <Route path="/reclamos" component={Reclamos} />
            <Route path="/reclamo" component={Reclamo} />
          </Layout>
        </Switch>
      </Suspense>
    </div>
  );
}

export default withAuth(App);
