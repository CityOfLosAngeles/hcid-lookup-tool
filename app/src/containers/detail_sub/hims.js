import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Hims extends Component {
	render(){
			//renders when there is no data to render
			if(!this.props.selected|| this.props.selected.length===0){
				return(
					<div>
						<h5>No HIMS data on record </h5>
					</div>
				)
			}

		const data = this.props.selected;

		return(
			<div className="detail-data">
				<h4 className="detail-datatable-title">Affordable Housing Trust Fund</h4>
				<p className="detail-info-title">Address: 
					<span className="detail-info">{data.HouseNum} {data.StreetName} {data.StreetTypeCd}</span>
				</p>
				<p className="detail-info-title">City: 
					<span className="detail-info">{data.City}</span>
				</p>
				<p className="detail-info-title">Zipcode: 
					<span className="detail-info">{data.ZipCode}</span>
				</p>
				<p className="detail-info-title">Housing Program: 
					<span className="detail-info">{data.HOUSING_PROGRAM}</span>
				</p>
				<p className="detail-info-title">Project ID: 
					<span className="detail-info">{data.ProjUniqueID}</span>
				</p>
				<p className="detail-info-title">Project #: 
					<span className="detail-info">{data.ProjectNo}</span>
				</p>
				<p className="detail-info-title">Status: 
					<span className="detail-info">{data.PROJECT_STATUS}</span>
				</p>
				<p className="detail-info-title">Project Info: 
					<span className="detail-info">{data.PROJECT_INFO}</span>
				</p>
				<p className="detail-info-title">House Frac Num: 
					<span className="detail-info">{data.HouseFracNum}</span>
				</p>
				<p className="detail-info-title">Council District: 
					<span className="detail-info">{data.CouncilDistrict}</span>
				</p>
				<p className="detail-info-title">Pre Directory CD: 
					<span className="detail-info">{data.PreDirCd}</span>
				</p>
				<p className="detail-info-title">Data Source: 
					<span className="detail-info">HIMS</span>
				</p>
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