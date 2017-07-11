

import axios from 'axios';

const API_URL = `http://localhost:6060/query?street_num=&street_name=&zipcode=`
export const FETCH_CITY = 'FETCH_CITY';

export function fetchCity(city){
	//const url = `${ROOT_URL}&q=${city},us`;
  //const streetNumber = city.streetNumber;
  //const streetName = city.streetName;
  const zipcode = city;

  const url =`${API_URL}${zipcode}`;
	const request = axios.get(url);
  console.log(request);

	return{
		type:FETCH_CITY,
		payload: request
	}
}
