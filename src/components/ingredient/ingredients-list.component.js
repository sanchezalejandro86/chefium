import React, { Component } from "react";

import NavBar from "../navbar.component";
import { Link } from "react-router-dom";
import IngredientService from "../../services/ingredient.service";

export default class IngredientsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        ingredients: [],
        currentIngredient: null,
        currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveIngredients();
  }

  retrieveIngredients() {
    IngredientService.getAll()
        .then(response => {
            this.setState({
                ingredients: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  refreshList() {
    this.retrieveIngredients();
    this.setState({
      currentIngredient: null,
      currentIndex: -1
    });
  }

  setActiveIngredient(ingredient, index) {
    this.setState({
      currentIngredient: ingredient,
      currentIndex: index
    });
  }

  render() {
    const { ingredients, currentIngredient, currentIndex } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row list">
                    <div className="col-md-6">
                        <h4>Ingredientes</h4>
                        <ul className="list-group">
                            {
                            ingredients.length > 0 &&
                                ingredients.map((ingredient, index) => (
                                <li key={index} className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveIngredient(ingredient, index)}
                                    >
                                    {ingredient._id} - {ingredient.descripcion}
                                </li>
                            ))}
                        </ul>
                        <Link to={"/ingredients/add"}>New</Link><br />
                    </div>
                    <div className="col-md-6">
                        {currentIngredient ? (
                        <div>
                        <h5>Ingrediente</h5>
                        <div>
                            <label>
                            <strong>ID:</strong>
                            </label>{" "}
                            {currentIngredient._id}
                        </div>
                        <div>
                            <label>
                            <strong>Descripción:</strong>
                            </label>{" "}
                            {currentIngredient.descripcion}
                        </div>
                        <Link
                            to={"/ingredients/" + currentIngredient._id}
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                        <br />
                        <p>Please click on an Ingredient...</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>                        
        </>
    )
  }
  
}