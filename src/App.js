import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
//import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/board-admin.component";
import DietsList from "./components/diets-list.component";
import Diet from "./components/diet.component";
import axios from "axios";
import AddDiet from "./components/diet-add.component";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.getCurrentUser() != null
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status === 401) {
    AuthService.logout();
    window.location = '/login';
  }

  return Promise.reject(error);
});

class App extends Component {
 
  render() {
    return (
      <Router>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/admin" component={BoardAdmin} />
              <PrivateRoute exact path="/diets" component={DietsList} />
              <PrivateRoute exact path="/diets/add" component={AddDiet} />
              <PrivateRoute path="/diets/:id" component={Diet} />
            </Switch>
      </Router>
    );
  }
}

export default App;
