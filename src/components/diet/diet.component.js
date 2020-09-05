import React, { Component } from "react";

import NavBar from "../navbar.component";
import DietService from "../../services/diet.service";

export default class Diet extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIcon = this.onChangeIcon.bind(this);

    this.getDiet = this.getDiet.bind(this);
    this.updateDiet = this.updateDiet.bind(this);
    this.deleteDiet = this.deleteDiet.bind(this);

    this.state = {
        currentDiet: {
            id: null,
            descripcion: "",
            icon: "",
          },
        message: ""
    };
  }

  componentDidMount() {
    this.getDiet(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDiet: {
        ...prevState.currentDiet,
        descripcion: description
      }
    }));
  }

  onChangeIcon(e) {
    const icon = e.target.value;
    
    this.setState(prevState => ({
      currentDiet: {
        ...prevState.currentDiet,
        icon: icon
      }
    }));
  }

  getDiet(id) {
    DietService.get(id)
      .then(response => {
        this.setState({
          currentDiet: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDiet() {
    DietService.update(
      this.state.currentDiet._id,
      this.state.currentDiet
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The diet was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDiet() {    
    DietService.delete(this.state.currentDiet._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/diets')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentDiet } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                {currentDiet ? (
                <div className="edit-form col-6">
                    <h4>Dieta</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentDiet.descripcion}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="icon">Icono</label>
                            <input
                                type="text"
                                className="form-control"
                                id="icon"
                                value={currentDiet.icono}
                                onChange={this.onChangeIcon}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-danger mr-2"
                        onClick={this.deleteDiet}
                    >
                    Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.updateDiet}
                    >
                    Update
                    </button>
                    <button
                        className="btn btn-defaut"
                        onClick={()=>{ this.props.history.push('/diets')}}
                    >
                    Cancel
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Diet...</p>
                </div>
                )}
            </div>
        </>
    )
  }
  
}