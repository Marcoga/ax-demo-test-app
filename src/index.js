import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import WatchlistContainer from "./Containers/Watchlist";
import FxRatesContainer from "./Containers/FxRates";
import { Login } from "./Components/Login";
import Navigation from "./Components/Navigation";
import "antd/dist/antd.css";
import "./styles.css";

class App extends React.Component {
  state = {
    language:
      document.cookie && document.cookie.includes("lang=")
        ? document.cookie.replace("lang=", "")
        : "en"
  };
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <Navigation
              language={this.state.language}
              username={"Guest"}
              onLangChange={newLanguage => {
                this.setState({
                  language: newLanguage
                });
              }}
            />

            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/fxrates" component={FxRatesContainer} />
              <Route
                path="/"
                render={(...routeProps) => (
                  <WatchlistContainer
                    {...routeProps}
                    language={this.state.language}
                  />
                )}
              />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
