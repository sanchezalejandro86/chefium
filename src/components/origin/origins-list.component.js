import React, { Component } from "react";

import NavBar from "../navbar.component";
import { Link } from "react-router-dom";
import OriginService from "../../services/origin.service";

export default class OriginsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        origins: [],
        currentOrigin: null,
        currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveOrigins();
  }

  retrieveOrigins() {
    OriginService.getAll()
        .then(response => {
            this.setState({
                origins: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
  }

  refreshList() {
    this.retrieveOrigins();
    this.setState({
      currentOrigin: null,
      currentIndex: -1
    });
  }

  setActiveOrigin(origin, index) {
    this.setState({
      currentOrigin: origin,
      currentIndex: index
    });
  }

  render() {
    const { origins, currentOrigin, currentIndex } = this.state;

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row list">
                    <div className="col-md-6">
                        <h4>Orígenes</h4>
                        <ul className="list-group">
                            {
                            origins.length > 0 &&
                                origins.map((origin, index) => (
                                <li key={index} className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveOrigin(origin, index)}
                                    >
                                    {origin._id} - {origin.descripcion}
                                </li>
                            ))}
                        </ul>
                        <Link to={"/origins/add"}>New</Link><br />
                    </div>
                    <div className="col-md-6">
                        {currentOrigin ? (
                        <div>
                        <h5>Orígen</h5>
                        <div>
                            <label>
                            <strong>ID:</strong>
                            </label>{" "}
                            {currentOrigin._id}
                        </div>
                        <div>
                            <label>
                            <strong>Descripción:</strong>
                            </label>{" "}
                            {currentOrigin.descripcion}
                        </div>
                        <Link
                            to={"/origins/" + currentOrigin._id}
                            className="btn btn-warning"
                        >
                            Edit
                        </Link>
                        </div>
                    ) : (
                        <div>
                        <br />
                        <p>Please click on an Origin...</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>                        
        </>
    )
  }
  
}