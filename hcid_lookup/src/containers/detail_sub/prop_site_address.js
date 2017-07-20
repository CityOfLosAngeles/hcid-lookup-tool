import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class PropertySiteAddress extends Component {
	render(){
			if(!this.props.selected|| this.props.selected.length===0){
				return(
					<div>
						<h5>No Property Site Address data on record </h5>
					</div>
				)
			}

		const data = this.props.selected;

		return(
			<div className="hims_data">
				<p className="detail-title">Property Site Address Data</p>
				<table className="responsive-table striped bordered">
					<thead>
						<tr>
							{/* <th>APN</th> */}
							<th>Council District</th>
							<th>CenTract 2010</th>
							<th>Community Name</th>
							<th>State Assembly District</th>
							<th>State Senator District</th>
							<th>US Congress District</th>
							<th>County Sup District #</th>
							<th>Community Plan Area ID</th>
							<th>Neighborhood Council ID</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{/* <td>{data.Apn}</td> */}
							<td>{data.CouncilDistrict}</td>
							<td>{data.CenTract2010}</td>
							<td>{data.CommunityName}</td>
							<td>{data.StateAssemDist}</td>
							<td>{data.StateSenDist}</td>
							<td>{data.UsCongDist}</td>
							<td>{data.CountySupDistNum}</td>
							<td>{data.CommunityPlanAreaID}</td>
							<td>{data.NeighborhoodCouncilID}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

function mapStatetoProps(state){
	return{
		selected : state.addresses.selected.Prop_site_addresses[0]
	};
}

export default connect(mapStatetoProps)(PropertySiteAddress);
