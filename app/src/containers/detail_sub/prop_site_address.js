import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class PropertySiteAddress extends Component {
	render(){
			//renders when there is no data to render
			if(!this.props.selected|| this.props.selected.length===0){
				return(
					<div>
						<h5>No Property Site Address data on record </h5>
					</div>
				)
			}

		const data = this.props.selected;

		return(
			<div className="detail-data">
				<h4 className="detail-datatable-title">Property Site Address</h4>
				<p className="detail-info-title">APN: 
					<span className="detail-info">{data.Apn}</span>
				</p>
				<p className="detail-info-title">Council District: 
					<span className="detail-info">{data.CouncilDistrict}</span>
				</p>
				<p className="detail-info-title">CenTract 2010: 
					<span className="detail-info">{data.CenTract2010}</span>
				</p>
				<p className="detail-info-title">Community Name: 
					<span className="detail-info">{data.CommunityName}</span>
				</p>
				<p className="detail-info-title">State Assembly District: 
					<span className="detail-info">{data.StateAssemDist}</span>
				</p>
				<p className="detail-info-title">State Senator District: 
					<span className="detail-info">{data.StateSenDist}</span>
				</p>
				<p className="detail-info-title">US Congress District: 
					<span className="detail-info">{data.UsCongDist}</span>
				</p>
				<p className="detail-info-title">County Sup District #: 
					<span className="detail-info">{data.CountySupDistNum}</span>
				</p>
				<p className="detail-info-title">Community Plan Area ID: 
					<span className="detail-info">{data.CommunityPlanAreaID}</span>
				</p>
				<p className="detail-info-title">Neighborhood Council ID: 
					<span className="detail-info">{data.NeighborhoodCouncilID}</span>
				</p>
				<p className="detail-info-title">Data Source: 
					<span className="detail-info">Property Site</span>
				</p>
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