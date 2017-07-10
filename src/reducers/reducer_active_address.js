export default function(state = null, action){
  switch(action.type){
    case 'Address_Selected':
    return action.payload;
  }
  return state;
}
