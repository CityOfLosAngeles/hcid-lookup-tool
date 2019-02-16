import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAddress } from '../actions/index';
import { bindActionCreators } from 'redux';
import SearchBar from './search_bar';
import NoResponse from '../components/no_response';
import Pagination from '../components/pagination';

class AddressList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			pageOfItems: []
		};
		this.onChangePage = this.onChangePage.bind(this);
	}

	// For edge case if no response from backend server. need to complete

	// renderList = () => {
	//   if(!this.props.addresses){
	//     alert("no response from server");
	//     return
	//   }
	//   else if(this.props.addresses.length ===0  ){
	//       return
	//      }
	//   return this.props.addresses.info.map((detail) =>{
	//     console.log(detail);
	//     return(
	//       <div
	//       key={detail.id}
	//       className="list-group-item card-panel hoverable address-list-title"
	//       onClick={()=>this.props.dispatch(selectAddress(detail))}>
	//         {detail.street_num} {detail.street_name} {detail.street_type}.
	//         <div>{detail.city}, {detail.state} {detail.zipcode}</div>
	//       </div>
	//     );
	//   });

	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({ pageOfItems: pageOfItems });
	}

	// Includes pagination which allows results to show in page format
	render() {
		console.log(this.props.addresses);
		return (
			<div className="flow-text address-list">
				<SearchBar />
				{this.state.pageOfItems.map(detail =>
					<div
						key={detail.id}
						className="list-group-item card-panel hoverable address-list-title"
						onClick={() => this.props.dispatch(selectAddress(detail))}
					>
						{detail.street_num} {detail.street_name} {detail.street_type}.
						<div>
							{detail.city}, {detail.state} {detail.zipcode}
						</div>
					</div>
				)}
				<Pagination
					// items={this.props.addresses.info}
					onChangePage={this.onChangePage}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		addresses: state.addresses.all
	};
}

// function mapDispatchToProps(dispatch){
//   //Whenever selectAddress is called, the result should be passed
//   //to all of our reducers
//   return bindActionCreators({ selectAddress: selectAddress}, dispatch)
// }

export default connect(mapStateToProps)(AddressList);