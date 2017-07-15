import React, {Component} from 'react';
import { connect } from 'react-redux';

class Hims extends Component {
	
/*	//We want Specific these Information from Him
	{
		Housing program
		project unique id
		project No
		Project Status
		Project Information
		APN
		House id
		house Number
		house farc
		council district
		pre directory cd
		street name
		street type cd
		post dir cd
		unit range
		unit Number
		zipcode
		city
	}*/
 		
	render(){
		if(!this.props.selected) return;
		console.log(this.props.selected);
		const APN = this.props.selected.Hims[0].APN;
		console.log("apm"+APN);
		return(
			  <div className="property-data">
				  
			      <table className="responsive-table striped bordered hoverable">
			      <thead>
			         <tr>
			         <th>Student</th><th>Class</th><th>Data #1</th>
			         <th>{APN}</th><th>Data #3</th><th>Data #4</th>
			         <th>Data #5</th><th>Data #6</th><th>Data #7</th>
			         <th>Data #8</th><th>Data #9</th><th>Data #10</th>
			         </tr>
			      </thead>
			      <tbody>
			         <tr>
			         <td>Mahesh Parashar</td><td>VI</td><td>10</td>
			         <td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
			         <td>16</td><td>17</td><td>19</td><td>20</td>
			         </tr>
			         <tr>
			         <td>Rahul Sharma</td><td>VI</td><td>10</td>
			         <td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
			         <td>16</td><td>17</td><td>19</td><td>20</td>
			         </tr>
			         <tr><td>Mohan Sood</td><td>VI</td><td>10</td>
			         <td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
			         <td>16</td><td>17</td><td>19</td><td>20</td>
			         </tr>
			       </tbody>
			       </table>
			  </div>
		
		);
	}

}



function mapStatetoProps(state){
	return{
		selected : state.addresses.selected
	};
}

export default connect(mapStatetoProps)(Hims); 