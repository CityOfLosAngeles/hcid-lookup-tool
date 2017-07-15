import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAddress } from '../actions/index';
import { bindActionCreators } from 'redux';
import SearchBar from './search_bar';

class AddressList extends Component {
  constructor(props){
    super(props);
    this.state = {term:''}


  }

  renderList = () => {
    if(this.props.addresses.length ===0){
      return
    }
    return this.props.addresses.info.map((detail) =>{
      console.log(detail);
      return(
        <div 
        key={detail.id} 
        className="list-group-item card-panel hoverable" 
        onClick={()=>this.props.dispatch(selectAddress(detail))}>

          {detail.street_num} {detail.street_name}, {detail.city} {detail.zipcode}

        </div>
      );
    });


  }


  render(){
    console.log(this.props.addresses);
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
    addresses: state.addresses.all
  };
}

// function mapDispatchToProps(dispatch){
//   //Whenever selectAddress is called, the result should be passed
//   //to all of our reducers
//   return bindActionCreators({ selectAddress: selectAddress}, dispatch)
// }



export default connect(mapStateToProps)(AddressList);
