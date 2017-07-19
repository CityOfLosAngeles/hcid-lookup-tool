import React, { Component } from 'react';
import '../App.css';
import AddressList from '../containers/address_list';
import AddressDetail from '../containers/address_detail';
import Header from './header';

class App extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="row header-row">
                    <div className="col s12">
                        <Header />
                    </div>
                </div>
                <div className="row">
                    <div className="col s3">
                        <AddressList />
                    </div>
                    <div className="col s9">
                        <AddressDetail />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
