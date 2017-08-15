import { combineReducers } from 'redux';
import AddressReducer from './reducer_addresses';

const rootReducer = combineReducers({
  addresses: AddressReducer
});

export default rootReducer;