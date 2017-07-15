import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hims from './detail_sub/hims';
import Bims from './detail_sub/bims';

class AddressDetail extends Component {
  


  render(){
  	
  	if (!this.props.activeAddress){
		return <div onClick={()=>console.log(this.props.activeAddress)}>Select an Address to get started
		
		</div>
		
	}
	
    return(

      <div onClick={()=>console.log(this.props.activeAddress)}>Address details
      <h3>Property Data</h3>
      <Hims/>
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