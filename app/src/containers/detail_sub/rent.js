import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Rent extends Component {
	render(){
		//renders when there is no data to render
		if(!this.props.selected|| this.props.selected.length===0){
			return(
				<div>
					<h5>No Rent data on record </h5>
				</div>
			)
		}

		const data = this.props.selected;

		return(
			<div className="hims_data">
				<h4 className="detail-datatable-title">Rent Data</h4>
				<p className="detail-info-title">APN: 
					<span className="detail-info">{data.APN}</span>
				</p>
				<p className="detail-info-title">Property Address: 
					<span className="detail-info">{data.Property_Address}</span>
				</p>
				<p className="detail-info-title">Service Date: 
					<span className="detail-info">{data.Service_Date}</span>
				</p>
				<p className="detail-info-title">Land Use Code: 
					<span className="detail-info">{data.Land_Use_Code}</span>
				</p>
				<p className="detail-info-title">Unit Count: 
					<span className="detail-info">{data.Unit_Count}</span>
				</p>
				<p className="detail-info-title">Exempted Units: 
					<span className="detail-info">{data.Exempted_Units}</span>
				</p>
				<p className="detail-info-title">RSO Units: 
					<span className="detail-info">{data.RSO_Units}</span>
				</p>
				<p className="detail-info-title">Year Built: 
					<span className="detail-info">{data.Year_Built}</span>
				</p>
				<p className="detail-info-title">Category: 
					<span className="detail-info">{data.Category}</span>
				</p>
				<p className="detail-info-title">Secondary Address: 
					<span className="detail-info">{data.Secondary_Address}</span>
				</p>
				<p className="detail-info-title">House ID: 
					<span className="detail-info">{data.houseID}</span>
				</p>

			</div>
			
		);
	}
}

function mapStatetoProps(state){
	return{
		selected : state.addresses.selected.Rents[0]
	};
}

export default connect(mapStatetoProps)(Rent);