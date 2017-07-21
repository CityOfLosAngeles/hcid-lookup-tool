import React, { Component } from 'react';
import '../App.css';
import AddressList from '../containers/address_list';
import AddressDetail from '../containers/address_detail';
import Header from './header';
import Pagination from './pagination';

class App extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="row header-row">
                    <div className="col s12 col-fix">
                        <Header />
                    </div>
                </div>
                <div className="row bottom-container">
                    <div className="col s3 address-list-component">
                        <AddressList />
                    </div>
                    <div className="col s9 address-detail-component">
                        <AddressDetail />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
