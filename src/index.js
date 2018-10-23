import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import WatchlistContainer from "./Containers/Watchlist";
import FxRatesContainer from "./Containers/FxRates";
import { Login } from "./Components/Login";
import Navigation from "./Components/Navigation";
import "antd/dist/antd.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Login>
          {username => (
            <>
              <Navigation username={username} />
              <Switch>
                <Route path="/fxrates" component={FxRatesContainer} />
                <Route path="/" component={WatchlistContainer} />
              </Switch>
            </>
          )}
        </Login>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
