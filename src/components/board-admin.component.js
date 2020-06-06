import React, { Component } from "react";

import NavBar from "./navbar.component";
import { Link } from "react-router-dom";

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
              <Link to={"/diets"}>
                Dietas
              </Link>
            </div>
          </div>
      </div>
      </>
    );
  }
}