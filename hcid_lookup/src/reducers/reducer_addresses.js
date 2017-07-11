import {FETCH_CITY} from '../actions/index';

export default function(state = [], action){
  switch (action.type){
    case FETCH_CITY:
      return [action.payload.data, ...state];
  }
  return state;
}
//
// export default function() {
//   return [
//     { name: '1001 South Pasadena Ave.'},
//     { name: '408 West Philadelphia Blvd'},
//     { name: '1600 Pensatucky Lane'},
//     { name: '69 Dove Place'},
//   ]
// }
