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
        : "de"
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Login>
            {username => (
              <>
                <Navigation
                  language={this.state.language}
                  username={username}
                  onLangChange={newLanguage => {
                    this.setState({
                      language: newLanguage
                    });
                  }}
                />

                <Switch>
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
            )}
          </Login>
        </Router>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
