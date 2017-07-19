import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hims from './detail_sub/hims';
import Bims from './detail_sub/bims';
import Prop from './detail_sub/prop_site_address';
import Rent from './detail_sub/rent';
import Scep from './detail_sub/scep';

class AddressDetail extends Component {
  render(){
  	if (!this.props.activeAddress){
		return (
			<div onClick={()=>console.log(this.props.activeAddress)}>Select an Address to get started</div>
		)
	}

    return(
      <div onClick={()=>console.log(this.props.activeAddress)}>
	      <Hims/>
        <br />
	      <Bims/>
        <br />
	      <Prop/>
        <br />
	      <Rent/>
        <br />
	      <Scep/>
      </div>
    );
  };
}

function mapStatetoProps(state){
	return{
		activeAddress: state.addresses.selected
	};
}

export default connect(mapStatetoProps)(AddressDetail);
