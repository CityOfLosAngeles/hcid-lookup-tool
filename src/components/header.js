import React, {Component} from 'react';
import '../hcidlogo.png';
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img className="logo" src={require("../hcidlogo.png")}></img>
      </div>
    );
  }
}
