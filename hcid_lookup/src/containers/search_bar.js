import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Input, Icon } from 'react-materialize';
import {bindActionCreators} from 'redux';
import {fetchCity} from '../actions/index';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.onInputChange= this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = { term: ''};
  }

  onInputChange(event){
    console.log(event.target.value);
    this.setState({term:event.target.value});
  }

  onFormSubmit(event){
    event.preventDefault();
    this.props.fetchCity(this.state.term);
    this.setState({term:''});

  }

  render() {
    return (
      <Row>
       
        <form onSubmit={this.onFormSubmit} className="input-group">
	      <Input
          s={12}
          label="Enter Address"
          className="input-field"
          value={this.state.term}
          onChange={this.onInputChange}
          validate>
          <Icon>search</Icon>
        </Input>
        <span><button type="submit" className="btn waves-effect waves-light btn-secondary">Search</button> </span>
         <span><button type="submit" className="btn waves-effect waves-light red ">Clear</button> </span>
        </form>
      </Row>
      /* <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <input id="search" value = {this.state.term}
               />
            <label className="label-icon" for="search"></label> */
            /* <i className="material-icons">close</i> */
          /* </div>
        </form>
      </div> */
    );
  }


}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchCity},dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);
