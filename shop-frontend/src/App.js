import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import RegisterContaier from "./containers/RegisterContainer";
import HomeContainer from "./containers/HomeContainer";
import TestComponet from "./containers/TestComponet";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContaier} />
        <Route path exact="/" component={HomeContainer} />
        <Route path exact="/abc" component={TestComponet} />
      </Switch>
    </Router>
  );
}

export default App;
