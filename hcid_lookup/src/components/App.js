import React, { Component } from 'react';
import '../App.css';
import AddressList from '../containers/address_list';
import AddressDetail from '../containers/address_detail';
import Header from './header';

class App extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="row">
                    <div className="col s12">
                        <Header />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        <AddressList />
                    </div>
                    <div className="col s8">
                        <span className=""><AddressDetail /></span>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
