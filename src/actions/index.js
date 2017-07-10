

import axios from 'axios';

const API_KEY = '0648201f937c7e016f06847e3e6955f3';
//const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + API_KEY;
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`
const API_URL = `http://localhost:6060/query?street_num=&street_name=&zipcode=`
export const FETCH_CITY = 'FETCH_CITY';

export function fetchCity(city){
	//const url = `${ROOT_URL}&q=${city},us`;
  //const streetNumber = city.streetNumber;
  //const streetName = city.streetName;
  const zipcode = city;

  const url =`http://localhost:6060/query?street_num=&street_name=&zipcode=${zipcode}`;
	const request = axios.get(url);
  console.log(request);

	return{
		type:FETCH_CITY,
		payload: request
	}
}
