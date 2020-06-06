import React, { Component } from "react";

import NavBar from "./navbar.component";
import { Link } from "react-router-dom";
import DietService from "../services/diet.service";

export default class DietsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        diets: [],
        currentDiet: null,
        currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveDiets();
  }

  retrieveDiets() {
    DietService.getAll()
        .then(response => {
            this.setState({
                diets: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  refreshList() {
    this.retrieveDiets();
    this.setState({
      currentDiet: null,
      currentIndex: -1
    });
  }

  setActiveDiet(diet, index) {
    this.setState({
      currentDiet: diet,
      currentIndex: index
    });
  }

  render() {
    const { diets, currentDiet, currentIndex } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Dietas</h4>
                        <ul className="list-group">
                            {
                            diets.length > 0 &&
                                diets.map((diet, index) => (
                                <li key={index} className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveDiet(diet, index)}
                                    >
                                    {diet.descripcion}
                                </li>
                            ))}
                        </ul>
                        <Link to={"/diets/add"}>New</Link><br />
                    </div>
                    <div className="col-md-6">
                        {currentDiet ? (
                        <div>
                        <h5>Dieta</h5>
                        <div>
                            <label>
                            <strong>ID:</strong>
                            </label>{" "}
                            {currentDiet._id}
                        </div>
                        <div>
                            <label>
                            <strong>Description:</strong>
                            </label>{" "}
                            {currentDiet.descripcion}
                        </div>
                        <Link
                            to={"/diets/" + currentDiet._id}
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                        <br />
                        <p>Please click on a Diet...</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>                        
        </>
    )
  }
  
}