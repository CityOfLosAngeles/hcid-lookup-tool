import React, {Component} from 'react';
import { connect } from 'react-redux';

class Bims extends Component {
	


	render(){
		console.log(this.props.Bims);
		return(
			<div> Bims </div>
		
		);
	}

}



function mapStatetoProps(state){
	return{
		Bims : state.activeAddress.Bims[0]
	};
}

export default connect(mapStatetoProps)(Bims); 