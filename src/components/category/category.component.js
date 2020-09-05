import React, { Component } from "react";

import NavBar from "../navbar.component";
import CategoryService from "../../services/category.service";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
        currentCategory: {
            id: null,
            descripcion: "",
          },
        message: ""
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCategory: {
        ...prevState.currentCategory,
        descripcion: description
      }
    }));
  }
  
  getCategory(id) {
    CategoryService.get(id)
      .then(response => {
        this.setState({
          currentCategory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCategory() {
    CategoryService.update(
      this.state.currentCategory._id,
      this.state.currentCategory
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The category was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCategory() {    
    CategoryService.delete(this.state.currentCategory._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/categories')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentCategory } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                {currentCategory ? (
                <div className="edit-form col-6">
                    <h4>Categoría</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentCategory.descripcion}
                                onChange={this.onChangeDescription}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-danger mr-2"
                        onClick={this.deleteCategory}
                    >
                    Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.updateCategory}
                    >
                    Update
                    </button>
                    <button
                        className="btn btn-defaut"
                        onClick={()=>{ this.props.history.push('/categories')}}
                    >
                    Cancel
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Category...</p>
                </div>
                )}
            </div>
        </>
    )
  }
  
}