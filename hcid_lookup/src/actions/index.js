

import axios from 'axios';

const API_URL = `http://localhost:6060/query?street_num=`
export const FETCH_CITY = 'FETCH_CITY';
export const ADDRESS_SELECTED = 'ADDRESS_SELECTED';



export function fetchCity(city){
	//const url = `${ROOT_URL}&q=${city},us`;
  //const streetNumber = city.streetNumber;
  //const streetName = city.streetName;
  console.log('FEtchy City');
  console.log(city);  
  // Edge case if user enters no value for search parameters
  if(city==='' || !city){
  	return{
  		type:null,
  		payload: null
  	}
  }

  //RUN THIS CODE WHEN INCOMPLETE ADDRESS (ONLY WHEN ZIP AND STREET NAME IS AVAILABLE)
  if(city.length===7){
    const zipcode = city[6].long_name;
    const url =`${API_URL}&street_name=&zipcode=${zipcode}`;
    const request = axios.get(url);

    return{
    type:FETCH_CITY,
    payload: request
    }

  }
  
  
 //RUN CODE FOR FULL ADDRESS
  const zipcode = city[7].long_name;
  const streetNumber = city[0].short_name;
  const streetName = city[1].short_name;

  const url =`${API_URL}${streetNumber}&street_name=&zipcode=${zipcode}`;
  const request = axios.get(url);


	return{
		type:FETCH_CITY,
		payload: request
	}
}

export function selectAddress(address){

	

	return{
		type: ADDRESS_SELECTED,
	 	payload: address	
	 }
}

