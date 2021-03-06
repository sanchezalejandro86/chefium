import React, { Component } from "react";
import OriginService from "../../services/origin.service";

export default class AddOrigin extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePaisISO3166_1 = this.onChangePaisISO3166_1.bind(this);
  
    this.saveOrigin = this.saveOrigin.bind(this);
    this.newOrigin = this.newOrigin.bind(this);

    this.state = {
      id: null,
      description: "",
      paisISO3166_1: "", 

      submitted: false
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePaisISO3166_1(e) {
    this.setState({
      paisISO3166_1: e.target.value
    });
  }

  saveOrigin() {
    var data = {
      descripcion: this.state.description
    };

    OriginService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          description: response.data.descripcion,
          paisISO3166_1: response.data.paisISO3166_1,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newOrigin() {
    this.setState({
      id: null,
      description: "",
      paisISO3166_1: "",

      submitted: false
    });
  }

  render() {
 
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newOrigin}>
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
                <label htmlFor="paisISO3166_1">Pais ISO3166-1</label>
                <input
                  type="text"
                  className="form-control"
                  id="paisISO3166_1"
                  required
                  value={this.state.paisISO3166_1}
                  onChange={this.onChangePaisISO3166_1}
                  name="paisISO3166_1"
                />
              </div>
              
              <button onClick={this.saveOrigin} className="btn btn-success">
                Submit
              </button>
              <button
                    className="btn btn-defaut"
                    onClick={()=>{ this.props.history.push('/origins')}}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      );

  }
}