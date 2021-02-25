import Layout from "./containers/Layout/index";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/index";
import Calendario from "./containers/Calendario/index";
import Reclamos from "./containers/reclamos/index";
import Reclamo from "./containers/reclamos/reclamo";
import Signin from "./containers/Signin/index";

function App() {
  return (
  <div>
    <Layout>
      <Switch>
        <Route path="/home"  component={Home} />
        <Route path="/calendario" component={Calendario} />
        <Route path="/reclamos/:id/:number" component={Reclamos} />
        <Route path="/reclamo" component={Reclamo} />
        <Route path="/" exact component={Signin} />
      </Switch>
    </Layout>

  </div>)
}

export default App;
