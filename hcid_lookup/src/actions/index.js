export function selectAddress(address){
  //selectAddress is an action creator, it needs to return an action, object
  //with a type property usually has two properties
  //type and payload
  return {
    type: 'Address_Selected',
    payload: address
  };
}
