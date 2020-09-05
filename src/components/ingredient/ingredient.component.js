import React, { Component } from "react";

import NavBar from "../navbar.component";
import IngredientService from "../../services/ingredient.service";

export default class Ingredient extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getIngredient = this.getIngredient.bind(this);
    this.updateIngredient = this.updateIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);

    this.state = {
        currentIngredient: {
            id: null,
            descripcion: "",
          },
        message: ""
    };
  }

  componentDidMount() {
    this.getIngredient(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentIngredient: {
        ...prevState.currentIngredient,
        descripcion: description
      }
    }));
  }
  
  getIngredient(id) {
    IngredientService.get(id)
      .then(response => {
        this.setState({
          currentIngredient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateIngredient() {
    IngredientService.update(
      this.state.currentIngredient._id,
      this.state.currentIngredient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The ingredient was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteIngredient() {    
    IngredientService.delete(this.state.currentIngredient._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/ingredients')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentIngredient } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                {currentIngredient ? (
                <div className="edit-form col-6">
                    <h4>Ingrediente</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentIngredient.descripcion}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-danger mr-2"
                        onClick={this.deleteIngredient}
                    >
                    Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.updateIngredient}
                    >
                    Update
                    </button>
                    <button
                        className="btn btn-defaut"
                        onClick={()=>{ this.props.history.push('/ingredients')}}
                    >
                    Cancel
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on an Ingredient...</p>
                </div>
                )}
            </div>
        </>
    )
  }
  
}