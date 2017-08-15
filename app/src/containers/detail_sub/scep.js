import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Scep extends Component {
	render(){
		//renders when there is no data to render
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