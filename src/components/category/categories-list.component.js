import React, { Component } from "react";

import NavBar from "../navbar.component";
import { Link } from "react-router-dom";
import CategoryService from "../../services/category.service";

export default class CategoriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        categories: [],
        currentCategory: null,
        currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveCategories();
  }

  retrieveCategories() {
    CategoryService.getAll()
        .then(response => {
            this.setState({
                categories: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  refreshList() {
    this.retrieveCategories();
    this.setState({
      currentCategory: null,
      currentIndex: -1
    });
  }

  setActiveCategory(category, index) {
    this.setState({
      currentCategory: category,
      currentIndex: index
    });
  }

  render() {
    const { categories, currentCategory, currentIndex } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row list">
                    <div className="col-md-6">
                        <h4>Categorías</h4>
                        <ul className="list-group">
                            {
                            categories.length > 0 &&
                                categories.map((category, index) => (
                                <li key={index} className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveCategory(category, index)}
                                    >
                                    {category._id} - {category.descripcion}
                                </li>
                            ))}
                        </ul>
                        <Link to={"/categories/add"}>New</Link><br />
                    </div>
                    <div className="col-md-6">
                        {currentCategory ? (
                        <div>
                        <h5>Categoría</h5>
                        <div>
                            <label>
                            <strong>ID:</strong>
                            </label>{" "}
                            {currentCategory._id}
                        </div>
                        <div>
                            <label>
                            <strong>Descripción:</strong>
                            </label>{" "}
                            {currentCategory.descripcion}
                        </div>
                        <Link
                            to={"/categories/" + currentCategory._id}
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                        <br />
                        <p>Please click on a Category...</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>                        
        </>
    )
  }
  
}