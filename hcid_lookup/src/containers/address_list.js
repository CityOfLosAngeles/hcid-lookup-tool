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

  renderList(data) {
    console.log(data.info);

    return data.info.map((detail) =>{

      return(
        <div className="list-group-item card-panel hoverable">
          {detail.street_num} {detail.street_name} {detail.city}
        </div>
      );
    });


}

  //     return (
  //       Object.keys(address).map(function(item){
  //         return (
  //           <div key={item.city} className="list-group-item card-panel hoverable">{item}</div>
  //         );
  //       })
  //     );
  //   })
  // }

    //   (address) => {
    //     console.log( this.props.addresses[0].info);
    //   return (
    //
    //     <div key={address} className="list-group-item card-panel hoverable">hi</div>
    //   );



  render(){
    return(
      <div className="col s4">
        <SearchBar />
        {this.props.addresses.map(this.renderList)}

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
