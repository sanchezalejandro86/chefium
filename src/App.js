import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "axios";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
//import Register from "./components/register.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/board-admin.component";
import DietsList from "./components/diet/diets-list.component";
import Diet from "./components/diet/diet.component";
import AddDiet from "./components/diet/diet-add.component";
import OriginsList from "./components/origin/origins-list.component";
import Origin from "./components/origin/origin.component";
import AddOrigin from "./components/origin/origin-add.component";
import UsersList from "./components/user/users-list.component";
import AddUser from "./components/user/user-add.component";
import User from "./components/user/user.component";
import TyC from "./components/tyc/tyc.component";
import Privacidad from "./components/privacy/privacy.component";

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
              <Route exact path="/terminos" component={TyC} />
              <Route exact path="/privacidad" component={Privacidad} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/admin" component={BoardAdmin} />

              <PrivateRoute exact path="/users" component={UsersList} />
              <PrivateRoute exact path="/users/add" component={AddUser} />
              <PrivateRoute path="/users/:id" component={User} />

              <PrivateRoute exact path="/diets" component={DietsList} />
              <PrivateRoute exact path="/diets/add" component={AddDiet} />
              <PrivateRoute path="/diets/:id" component={Diet} />

              <PrivateRoute exact path="/origins" component={OriginsList} />
              <PrivateRoute exact path="/origins/add" component={AddOrigin} />
              <PrivateRoute path="/origins/:id" component={Origin} />

            </Switch>
      </Router>
    );
  }
}

export default App;
