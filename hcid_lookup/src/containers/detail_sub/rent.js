import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Rent extends Component {
	render(){
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
				<p className="detail-title">Rent Data</p>
				<table className="responsive-table striped bordered hoverable">
					<thead>
						<tr>
							<th>APN</th>
							<th>Property Address</th>
							<th>Service Date</th>
							<th>Land Use Code</th>
							<th>Unit Count</th>
							<th>Exempted Units</th>
							<th>RSO Units</th>
							<th>Year Built</th>
							<th>Category</th>
							<th>Secondary Address</th>
							<th>House ID</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{data.APN}</td>
							<td>{data.Property_Address}</td>
							<td>{data.Service_Date}</td>
							<td>{data.Land_Use_Code}</td>
							<td>{data.Unit_Count}</td>
							<td>{data.Exempted_Units}</td>
							<td>{data.RSO_Units}</td>
							<td>{data.Year_Built}</td>
							<td>{data.Category}</td>
							<td>{data.Secondary_Address}</td>
							<td>{data.houseID}</td>
				    	</tr>
					</tbody>
				</table>
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