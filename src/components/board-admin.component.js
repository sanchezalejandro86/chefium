import React, { Component } from "react";

import UserService from "../services/user.service";
import NavBar from "./navbar.component";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <>
      <NavBar />
      <div>
          <div className="container mt-3">
            <div className="container">
              <header className="jumbotron">
                <h3>Admin Board</h3>
              </header>
            </div>
          </div>
      </div>
      </>
    );
  }
}