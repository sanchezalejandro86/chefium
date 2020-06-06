import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showAdminBoard: false,
        currentUser: undefined
    };

    this.logOut = this.logOut.bind(this);
  }
  
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.rol === "administrador"
      });
    }
  }


  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              chefium
            </Link>
            <div className="navbar-nav mr-auto">
              
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.correo}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                
              </div>
            )}
          </nav>
    );
  }
}
