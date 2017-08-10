import React, {Component} from 'react';
import '../la_logo.png';
import '../hcid_logo.png';
import '../search_icon.png';

//header component is static and does not depend on our application state
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-home-link">
          <a className="home-link" href="/" id="global_nav_la_4324422-logo-img" target="_self" alt="Los Angeles Logo">
            <img className="header-city-logo" src={require("../la_logo.png")} alt="smiley"></img>
            <img className="header-logo" src={require("../hcid_logo.png")} alt="smiley"></img>
          </a>
        </div>
		    <span className="header-title flow-text align-center">Look Up Tool</span>
        <span><img className="search-icon" src={require("../search_icon.png")} alt="smiley"></img></span>
      </div>
    );
  }
}