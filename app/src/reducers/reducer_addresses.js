import {ADDRESS_SELECTED, FETCH_CITY} from '../actions/index';

export default function(state = {selected: null, all: []}, action){
  switch (action.type) {
  	//this manages our application state when our API call is made
    //it updates our state with the searched address and displays it here

    case FETCH_CITY: 
  	console.log(action.payload);
	  	return {
	  		...state, 
	  		all: action.payload.data
	  	}

    //in the case where the address is selected, it updates this reducer
    //and allows access to the data within this address
    case ADDRESS_SELECTED:
    	return {
    		...state,
    		selected: action.payload};
  }
  return state;
}