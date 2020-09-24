import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

class App extends React.Component {
  // movie_theater = (name) => {
  //   return {
  //     get_name: function () {
  //       return name;
  //     },
  //     set_name: function (_name) {
  //       name = _name;
  //     },
  //   };
  // };

  render() {
    // const one = this.movie_theater("Soo");
    // console.log(one.get_name());
    // one.set_name("Su");
    // console.log(one.get_name());

    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rooms">
            <Rooms />
          </Route>
          {/*<Route path="/rooms" component={Rooms}/> */}
          <Route exact path="/rooms/:slug" component={SingleRoom} />
          <Route component={Error} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
