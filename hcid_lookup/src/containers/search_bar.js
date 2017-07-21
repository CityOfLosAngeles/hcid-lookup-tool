import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from 'react-materialize';
import {bindActionCreators} from 'redux';
import {fetchCity} from '../actions/index';
import Geosuggest from 'react-geosuggest';
import Autocomplete from 'react-google-autocomplete';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.onInputChange= this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = { term: ''};
    }
    onInputChange(event){   
        console.log("oninputchange" +event);
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
                <div className="detail-search-text">Search</div>
                <Autocomplete
                    style={{width: '100%', height: '40px'}}
                    onPlaceSelected={(place) => {this.props.fetchCity(place.address_components);}}
                    types={['address']}
                    componentRestrictions={{country: "us"}}
                 />  

                {/*<form onSubmit={this.onFormSubmit} className="input-group">
                    <div className="input-field">
                        <input id="search" className="search-input" type="search" placeholder="Enter Address" 
                        value={this.state.term} onChange={this.onInputChange} validate></input>
                        <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                    </div>
                    <div className="search-buttons">
                        <span><button type="submit" className="btn waves-effect waves-light btn-secondary">Search</button></span>
                        <span><button type="submit" className="btn waves-effect waves-light red search-button-clear">Clear</button> </span>
                    </div>
                </form>*/}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCity},dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);