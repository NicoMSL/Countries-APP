import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LangingPage";
import Home from "./components/Home";
import Activity from "./components/Activity";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/details/:id" component={Detail} />
          <Route path="/activity" component={Activity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
