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
			<div className="detail-data">
				<h4 className="detail-datatable-title">SCEP</h4>
				<p className="detail-info-title">PropID: 
					<span className="detail-info">{data.propID}</span>
				</p>
				<p className="detail-info-title">Perm Exemptions: 
					<span className="detail-info">{data.PermExemptions}</span>
				</p>
				<p className="detail-info-title">Total Exemptions: 
					<span className="detail-info">{data.TotalExemptions}</span>
				</p>
				<p className="detail-info-title">Council District No.: 
					<span className="detail-info">{data.councilDistrictNo}</span>
				</p>
				<p className="detail-info-title">Census Tract: 
					<span className="detail-info">{data.censusTract}</span>
				</p>
				<p className="detail-info-title">Year Built: 
					<span className="detail-info">{data.yearBuilt}</span>
				</p>
				<p className="detail-info-title">Units: 
					<span className="detail-info">{data.units}</span>
				</p>
				<p className="detail-info-title">Land Use Description: 
					<span className="detail-info">{data.landUseDesc}</span>
				</p>
				<p className="detail-info-title">Code District: 
					<span className="detail-info">{data.CodeDistrict}</span>
				</p>
				<p className="detail-info-title">Code District ID: 
					<span className="detail-info">{data.CodeDistrictID}</span>
				</p>
				<p className="detail-info-title">House Number: 
					<span className="detail-info">{data.HouseNum}</span>
				</p>
				<p className="detail-info-title">Street Name: 
					<span className="detail-info">{data.street_name}</span>
				</p>
				<p className="detail-info-title">Property Address: 
					<span className="detail-info">{data.Property_Address}</span>
				</p>
				<p className="detail-info-title">Street Direction: 
					<span className="detail-info">{data.StreetDirection}</span>
				</p>
				<p className="detail-info-title">Flg Deleted: 
					<span className="detail-info">{data.FlgDeleted}</span>
				</p>
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

{/*			<div className="detail-data">
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
			</div>*/}