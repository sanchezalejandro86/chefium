import React, { Component } from "react";

import NavBar from "../navbar.component";
import UserService from "../../services/user.service";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
        currentUser: {
            id: null,
            nombres: "",
            apellidos: "",
            correo: "",
          },
        message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        nombres: name
      }
    }));
  }
  
  onChangeLastname(e) {
    const lastname = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        apellidos: lastname
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        correo: email
      }
    }));
  }

  getUser(id) {
    UserService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserService.update(
      this.state.currentUser._id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserService.delete(this.state.currentUser._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentUser } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                {currentUser ? (
                <div className="edit-form col-6">
                    <h4>Usuario</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={currentUser.nombres}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                value={currentUser.apellidos}
                                onChange={this.onChangeLastname}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={currentUser.correo}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-danger mr-2"
                        onClick={this.deleteUser}
                    >
                    Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.updateUser}
                    >
                    Update
                    </button>
                    <button
                        className="btn btn-defaut"
                        onClick={()=>{ this.props.history.push('/users')}}
                    >
                    Cancel
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
                )}
            </div>
        </>
    )
  }
  
}