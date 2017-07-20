import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

class Bims extends Component {
	render(){
			if(!this.props.selected|| this.props.selected.length===0){
				return(
					<div>
						<h5>No BIMS data on record </h5>
					</div>
				)
			}

		const data = this.props.selected;

		return(
			<div className="detail-data">
				<h4 className="detail-datatable-title">BIMS</h4>
				<p className="detail-info-title">Property Address: 
					<span className="detail-info">{data.Property_City_State_Zip}</span>
				</p>
				<p className="detail-info-title">Statement Date: 
					<span className="detail-info">{data.StatementDate}</span>
				</p>
				<p className="detail-info-title">APN: 
					<span className="detail-info">{data.APN}</span>
				</p>
				<p className="detail-info-title">RSO Exemptions: 
					<span className="detail-info">{data.RSO_Exemptions}</span>
				</p>
				<p className="detail-info-title">SCEP Exemptions: 
					<span className="detail-info">{data.SCEP_Exmpetions}</span>
				</p>
				<p className="detail-info-title">Total Units: 
					<span className="detail-info">{data.Total_Units}</span>
				</p>
				<p className="detail-info-title">RSO Units Billed: 
					<span className="detail-info">{data.RSO_Units_Billed}</span>
				</p>
				<p className="detail-info-title">SCEP Units Billed: 
					<span className="detail-info">{data.SCEP_Units_Billed}</span>
				</p>
				<p className="detail-info-title">Data Source: 
					<span className="detail-info">BIMS</span>
				</p>
			</div>
			
		);
	}
}

function mapStatetoProps(state){
	return{
		selected : state.addresses.selected.Bims[0]
	};
}

export default connect(mapStatetoProps)(Bims);

/*
<div className="hims_data">
				<p className="detail-title">BIMS Data</p>
				<table className="responsive-table striped centered bordered">
					<thead>
					     <tr>
					     	 <th>Property Address</th>
					         <th>Statement Date</th>
					          <th>APN</th> 
					         <th>RSO Exemptions</th>
					         <th>SCEP Exemptions</th>
					         <th>Total Units</th>
					         <th>RSO Units Billed</th>
					         <th>SCEP Units Billed</th>
					     </tr>
					</thead>
					<tbody>
						<tr>
							<td>{data.Property_Address} {data.Property_City_State_Zip}</td>
							<td>{data.StatementDate}</td>
							 <td>{data.APN}</td> 
							<td>{data.RSO_Exemptions}</td>
							<td>{data.SCEP_Exmpetions}</td>
							<td>{data.Total_Units}</td>
							<td>{data.RSO_Units_Billed}</td>
							<td>{data.SCEP_Units_Billed}</td>
				    	</tr>
					</tbody>
				</table>
			</div>*/