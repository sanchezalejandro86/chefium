import React, { Component } from "react";

import NavBar from "../navbar.component";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: [],
        currentUser: null,
        currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    UserService.getAll()
        .then(response => {
            this.setState({
                users: response.data.usuarios
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row list">
                    <div className="col-md-6">
                        <h4>Usuarios</h4>
                        <ul className="list-group">
                            {
                            users.length > 0 &&
                                users.map((user, index) => (
                                <li key={index} className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveUser(user, index)}
                                    >
                                    {user._id} - {user.nombres} {user.apellidos}
                                </li>
                            ))}
                        </ul>
                        <Link to={"/users/add"}>New</Link><br />
                    </div>
                    <div className="col-md-6">
                        {currentUser ? (
                        <div>
                        <h5>Usuario</h5>
                        <div>
                            <label>
                            <strong>ID:</strong>
                            </label>{" "}
                            {currentUser._id}
                        </div>
                        <div>
                            <label>
                            <strong>Foto:</strong>
                            </label>{" "}
                            <img src={currentUser.foto} width="200px"/>
                        </div>
                        <div>
                            <label>
                            <strong>Nombres:</strong>
                            </label>{" "}
                            {currentUser.nombres}
                        </div>
                        <div>
                            <label>
                            <strong>Apellidos:</strong>
                            </label>{" "}
                            {currentUser.apellidos}
                        </div>
                        <div>
                            <label>
                            <strong>Email:</strong>
                            </label>{" "}
                            {currentUser.correo}
                        </div>
                        <div>
                            <label>
                            <strong>Recetas:</strong>
                            </label>{" "}
                            {currentUser.recetas.length}
                        </div>
                        <div>
                            <label>
                            <strong>Favoritas:</strong>
                            </label>{" "}
                            {currentUser.favoritas.length}
                        </div>
                        <Link
                            to={"/users/" + currentUser._id}
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                        <br />
                        <p>Please click on a User...</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>                        
        </>
    )
  }
  
}