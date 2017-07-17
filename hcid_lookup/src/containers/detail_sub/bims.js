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
			<div className="hims_data">
				<p className="detail-title">BIMS Data</p>
				<table className="responsive-table striped bordered hoverable">
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