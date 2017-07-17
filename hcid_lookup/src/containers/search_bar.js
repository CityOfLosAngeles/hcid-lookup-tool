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
            <div>
                <form onSubmit={this.onFormSubmit} className="input-group">
                    <div className="input-field">
                        <input id="search" className="search-input" type="search" placeholder="Enter Address" 
                        value={this.state.term} onChange={this.onInputChange} validate></input>
                        <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                    </div>
                    <div className="search-buttons">
                        
                        <span><button type="submit" className="btn waves-effect waves-light btn-secondary">Search</button></span>
                        <span><button type="submit" className="btn waves-effect waves-light red search-button-clear">Clear</button> </span>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCity},dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);
