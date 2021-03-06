import React, { Component } from "react";
import DietService from "../../services/diet.service";

export default class AddDiet extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIcon = this.onChangeIcon.bind(this);

    this.saveDiet = this.saveDiet.bind(this);
    this.newDiet = this.newDiet.bind(this);

    this.state = {
      id: null,
      description: "",
      icon: "", 

      submitted: false
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeIcon(e) {
    this.setState({
      icon: e.target.value
    });
  }

  saveDiet() {
    var data = {
      descripcion: this.state.description,
      icono: this.state.icon
    };

    DietService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          description: response.data.descripcion,
          icon: response.data.icono,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDiet() {
    this.setState({
      id: null,
      description: "",
      icon: "",

      submitted: false
    });
  }

  render() {
 
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newDiet}>
                Add
              </button>
            </div>
          ) : (
            <div>
              
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="icon">Icono</label>
                <input
                  type="text"
                  className="form-control"
                  id="icon"
                  required
                  value={this.state.icon}
                  onChange={this.onChangeIcon}
                  name="icon"
                />
              </div>

              <button onClick={this.saveDiet} className="btn btn-success">
                Submit
              </button>
              <button
                    className="btn btn-defaut"
                    onClick={()=>{ this.props.history.push('/diets')}}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      );

  }
}