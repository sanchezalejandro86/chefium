import React, { Component } from "react";

import logo from './logo.png';
import mobile from './mobile.png';
import playStore from './google-play.png';
import './styles.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div id="home" className="welcome-area bg-overlay overflow-hidden ">
        <div className="container">
          <img src={logo} alt="logo" width="20%"></img>
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="text-white">
                  Cocina con lo que tienes
              </h1>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit nihil tenetur minus quidem est deserunt molestias accusamus harum ullam tempore debitis et, expedita, repellat delectus aspernatur neque itaque qui quod.
              </p>
              <div class="button-group store-buttons d-flex">
                  <a href="#">
                      <img src={playStore} alt="" width="50%"/>
                  </a>
                  
              </div>
            </div>
            <div className="col-md-5">
              <img src={mobile} alt="mobile" className="mobile"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}