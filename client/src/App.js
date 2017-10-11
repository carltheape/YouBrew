import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Availability from "./pages/Availability";
import MySales from "./pages/MySales";
import Request from "./pages/Request";
import Admin from "./pages/Admin";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const About = () => <h1>About Us</h1>

const App = () =>

  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/callback" component={SignIn} />
        <Route exact path="/availability" component={Availability} />
        <Route exact path="/mysales" component={MySales} />
        <Route exact path="/request" component={Request} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
