import React, { Component } from "react";
import AuthService from "../services/auth.service";
import NavBar from "./navbar.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
      <NavBar />
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.nombres} {currentUser.apellidos}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser._id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.correo}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.rol &&
            <li key='1'>{currentUser.rol}</li>}
        </ul>
      </div>
      </>
    );
  }
}