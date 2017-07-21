import {ADDRESS_SELECTED, FETCH_CITY} from '../actions/index';

export default function(state = {selected: null, all: []}, action){
  switch (action.type) {
  	case FETCH_CITY: 
  	console.log(action.payload);
	  	return {
	  		...state, 
	  		all: action.payload.data
	  	}
    case ADDRESS_SELECTED:
    	return {
    		...state,
    		selected: action.payload};
  }
  return state;
}