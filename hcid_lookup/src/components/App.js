import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import AddressList from '../containers/address_list';
import AddressDetail from '../containers/address_detail';
import Header from './header';

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="App row">
          <div class="col s5 push-s7"><span class="flow-text"><AddressList /></span></div>
        </div>
          <div class="col s7 pull-s5"><span class="flow-text"><AddressDetail /></span></div>
      </div>
    );
  }
}

export default App;
