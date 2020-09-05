import React, { Component } from "react";
import CategoryService from "../../services/category.service";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.newCategory = this.newCategory.bind(this);

    this.state = {
      id: null,
      description: "", 

      submitted: false
    };
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveCategory() {
    var data = {
      descripcion: this.state.description
    };

    CategoryService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          description: response.data.descripcion,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCategory() {
    this.setState({
      id: null,
      description: "",

      submitted: false
    });
  }

  render() {
 
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newCategory}>
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
  
              <button onClick={this.saveCategory} className="btn btn-success">
                Submit
              </button>
              <button
                    className="btn btn-defaut"
                    onClick={()=>{ this.props.history.push('/categories')}}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      );

  }
}