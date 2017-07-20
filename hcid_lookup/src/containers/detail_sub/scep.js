import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Scep extends Component {
	render(){
		if(!this.props.selected|| this.props.selected.length===0){
			return(
				<div>
					<h5>No SCEP data on record </h5>
				</div>
			)
		}

		const data = this.props.selected;

		return(
			<div className="hims_data">
				<p className="detail-title">SCEP Data</p>
				<table className="responsive-table striped centered bordered">
					<thead>
						<tr>
							<th>PropID</th>
							<th>Perm Exemptions</th>
							<th>Total Exemptions</th>
							<th>Council District No.</th>
							<th>Census Tract</th>
							<th>Year Built</th>
							<th>Units</th>
							{/* <th>APN</th> */}
							<th>Land Use Description</th>
							<th>Code District</th>
							<th>Code District ID</th>
							<th>House Number</th>
							<th>Street Name</th>
							<th>Property Address</th>
							<th>Street Direction</th>
							<th>Flg Deleted</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{data.propID}</td>
							<td>{data.PermExemptions}</td>
							<td>{data.TotalExemptions}</td>
							<td>{data.councilDistrictNo}</td>
							<td>{data.censusTract}</td>
							<td>{data.yearBuilt}</td>
							<td>{data.units}</td>
							{/* <td>{data.APN}</td> */}
							<td>{data.landUseDesc}</td>
							<td>{data.CodeDistrict}</td>
							<td>{data.CodeDistrictID}</td>
							<td>{data.HouseNum}</td>
							<td>{data.Property_Address}</td>
							<td>{data.StreetDirection}</td>
							<td>{data.FlgDeleted}</td>
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
		selected : state.addresses.selected.Sceps[0]
	};
}

export default connect(mapStatetoProps)(Scep);
