import React, { Component } from "react";

import NavBar from "../navbar.component";
import OriginService from "../../services/origin.service";

export default class Origin extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.updateOrigin = this.updateOrigin.bind(this);
    this.deleteOrigin = this.deleteOrigin.bind(this);

    this.state = {
        currentOrigin: {
            id: null,
            descripcion: "",
          },
        message: ""
    };
  }

  componentDidMount() {
    this.getOrigin(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentOrigin: {
        ...prevState.currentOrigin,
        descripcion: description
      }
    }));
  }
  
  getOrigin(id) {
    OriginService.get(id)
      .then(response => {
        this.setState({
          currentOrigin: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOrigin() {
    OriginService.update(
      this.state.currentOrigin._id,
      this.state.currentOrigin
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The origin was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOrigin() {    
    OriginService.delete(this.state.currentOrigin._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/origins')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentOrigin } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                {currentOrigin ? (
                <div className="edit-form col-6">
                    <h4>Orígen</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentOrigin.descripcion}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-danger mr-2"
                        onClick={this.deleteOrigin}
                    >
                    Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.updateOrigin}
                    >
                    Update
                    </button>
                    <button
                        className="btn btn-defaut"
                        onClick={()=>{ this.props.history.push('/origins')}}
                    >
                    Cancel
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on an Origin...</p>
                </div>
                )}
            </div>
        </>
    )
  }
  
}