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
    //monitoring our current state in the search bar
    onInputChange(event){
        console.log("oninputchange" +event);
        this.setState({term:event.target.value});

    }
    //when submitting we call this function .
    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchCity(this.state.term);
        this.setState({term:''});
    }
    render() {
        //we replaced initial serach bar function with a 3rd party autocomplete
        //utilizing google places to suggest appropriate addresses
        return (
            <div>

                <Autocomplete
                    style={{width: '100%', height: '40px'}}
                    onPlaceSelected={(place) => {this.props.fetchCity(place.address_components);}}
                    types={['address']}
                    componentRestrictions={{country: "us"}}
                 />

            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchCity},dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);
