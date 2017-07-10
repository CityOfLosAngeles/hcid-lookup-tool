import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import AddressList from '../containers/address_list';
import AddressDetail from '../containers/address_detail';
import Header from './header';

class App extends Component {
  constructor(props) {
      super(props);

      
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="App row">
          <div class="col s7 push-s5"><span class="flow-text"><AddressList /></span></div>
          <div class="col s5 pull-s7"><span class="flow-text"><AddressDetail /></span></div>
        </div>
      </div>
    );
  }
}

export default App;
