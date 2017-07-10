import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAddress } from '../actions/index';
import { bindActionCreators } from 'redux';
import SearchBar from './search_bar';

class AddressList extends Component {
  renderList() {
    return this.props.addresses.map((address) => {
      return (
        <div key={address.name} className="list-group-item card-panel hoverable">{address.name}</div>
      );
    });
  }

  render(){
    return(
      <div className="col s4">
        <SearchBar />
        {this.renderList()}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return{
    addresses: state.addresses
  };
}

export default connect(mapStateToProps)(AddressList);
