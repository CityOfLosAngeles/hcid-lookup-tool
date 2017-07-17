import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Hims extends Component {
	render(){
			if(!this.props.selected|| this.props.selected.length===0){
				return(
					<div>
						<h5>No HIMS data on record </h5>
					</div>
				)	
			}

		const data = this.props.selected;

		return(
			<div className="hims_data hoverable">
				<p className="detail-title">HIMS Data</p>
				<table className="responsive-table striped bordered">
					<thead>
						<tr>
							<th>Address</th>
							<th>City</th>
							<th>Zipcode</th>
							<th>Housing Program</th>
							<th>Project ID</th>
							<th>Project #</th>
							<th>Status</th>
							<th>Project Info</th>
							<th>APN</th>
							<th>House Frac Number</th>
							<th>Council District</th>
							<th>Pre Directory CD</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{data.HouseNum} {data.StreetName} {data.StreetTypeCd}</td>
							<td>{data.City}</td>
							<td>{data.ZipCode}</td>
							<td>{data.HOUSING_PROGRAM}</td>
							<td>{data.ProjUniqueID}</td>
							<td>{data.ProjectNo}</td>
							<td>{data.PROJECT_STATUS}</td>
							<td>{data.PROJECT_INFO}</td>
							<td>{data.APN}</td>
							<td>{data.HouseFracNum}</td>
							<td>{data.CouncilDistrict}</td>
							<td>{data.PreDirCd}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStatetoProps(state){
	return{
		selected : state.addresses.selected.Hims[0]
	};
}

export default connect(mapStatetoProps)(Hims); 