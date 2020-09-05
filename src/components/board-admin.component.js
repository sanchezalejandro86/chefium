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
              <ul>
                <li><Link to={"/users"}>
                  Usuarios
                </Link></li>
                <li><Link to={"/categories"}>
                  Categorías
                </Link></li>
                <li><Link to={"/diets"}>
                  Dietas
                </Link></li>
                <li><Link to={"/origins"}>
                  Orígenes
                </Link></li>
                <li><Link to={"/ingredients"}>
                  Ingredientes
                </Link></li>
              </ul>
            </div>
          </div>
      </div>
      </>
    );
  }
}