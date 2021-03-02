import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home/index";
import Calendario from "./containers/Calendario/index";
import Reclamos from "./containers/reclamos/index";
import Reclamo from "./containers/reclamos/reclamo";
import Signin from "./containers/Signin/index";
import withAuth from "./hoc/withAuth/index";
import { useSelector } from "react-redux";
import Layout from "./containers/Layout/index";
import Client from "./containers/Client/Client";
import ClientSubAccount from "./containers/Client/ClientSubAccount/ClientSubAccount";

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
      <Switch>
        <Route path="/" exact component={Signin} />
        <Layout>
          <Route path="/home" component={Home} />
          <Route path="/reclamo" component={Reclamo} />
          <Route path="/clientSubAccount" component={ClientSubAccount} />
          <Route path="/client" component={Client} />
          <Route path="/calendario" component={Calendario} />
          <Route path="/reclamos" component={Reclamos} />
        </Layout>
      </Switch>
    </div>
  );
}

export default withAuth(App);
