import React, {Component} from 'react';
import '../la_logo.png';
import '../hcid_logo.png';
export default class Header extends Component {
  render() {
    return (
      <div className="header valign-wrapper">
        <img className="header-city-logo" src={require("../la_logo.png")} alt="smiley"></img>
        <img className="header-logo" src={require("../hcid_logo.png")} alt="smiley"></img>
		    <span className="header-title flow-text align-center">Look Up Tool
		    </span>
      </div>
    );
  }
}