import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hims from './detail_sub/hims';
import Bims from './detail_sub/bims';
import Prop from './detail_sub/prop_site_address';
import Rent from './detail_sub/rent';
import Scep from './detail_sub/scep';
import ReactPDF from 'react-pdf';


class AddressDetail extends Component {
  render(){
  	if (!this.props.activeAddress){
		return (
			<div onClick={()=>console.log(this.props.activeAddress)}>
        <br />
        <div className="detail-text">Please enter an address into the search bar.</div>
      </div>
		)
	}
    const data = this.props.activeAddress;

    return(
      <div className="address-detail" onClick={()=>console.log(this.props.activeAddress)}>
        <h4 className="detail-title">HCIDLA Property Data 2016-2017</h4>
        <div className="prop-address-container">
          <div className="col s12">
            <div className="prop-address">Property Address: 
              <span className="prop-address-data">{data.street_num} {data.street_dir_cd} {data.street_name} {data.street_type}, {data.city} {data.zipcode}</span>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col s4">
              <div className="prop-address">Council District: 
                <span className="prop-address-data">{data.Prop_site_addresses[0].CouncilDistrict}</span>
              </div>
            </div>
            <div className="col s4">
              <div className="prop-address">APN: 
                <span className="prop-address-data">{data.Prop_site_addresses[0].Apn}</span>
              </div>
            </div>
            <div className="col s4">
              <div className="prop-address">Census Tract: 
                <span className="prop-address-data">{data.Prop_site_addresses[0].CenTract2010}</span>
              </div>
            </div>
          </div>
        </div>
          <div className="row">
            <div className="col s6"><Hims/><br /><Bims/></div>
            <div className="col s6">
      	      <Prop/>
              <br />
      	      <Rent/>
              <br />
      	      <Scep/>
            </div>
          </div>
      </div>
    );
  };
}

function mapStatetoProps(state){
	return{
		activeAddress: state.addresses.selected
	};
}

export default connect(mapStatetoProps)(AddressDetail);
