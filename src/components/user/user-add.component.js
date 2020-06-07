import React, { Component } from "react";
import UserService from "../../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      name: "", 
      lastname: "", 
      email: "", 

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  saveUser() {
    var data = {
      nombres: this.state.name,
      apellidos: this.state.lastname,
      correo: this.state.email
    };

    UserService.create(data)
      .then(response => {
        this.setState({
          id: response.data._id,
          name: response.data.nombres,
          lastname: response.data.apellidos,
          email: response.data.correo,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      name: "",
      lastname: "",
      email: "",

      submitted: false
    });
  }

  render() {
 
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newUser}>
                Add
              </button>
            </div>
          ) : (
            <div>
              
              <div className="form-group">
                <label htmlFor="name">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                  value={this.state.lastname}
                  onChange={this.onChangeLastname}
                  name="lastname"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>
  
              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
              <button
                    className="btn btn-defaut"
                    onClick={()=>{ this.props.history.push('/users')}}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      );

  }
}