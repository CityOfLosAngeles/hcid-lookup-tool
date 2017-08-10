import axios from 'axios';
const API_URL = `http://localhost:6060/query?street_num=`;
export const FETCH_CITY = 'FETCH_CITY';
export const ADDRESS_SELECTED = 'ADDRESS_SELECTED';


//function to clean up JSON object we recieve from google places
//this is important in our API call because of the way the street data
//is formated
function streetCleanup(string) {
	let str = string.split(' ').shift();
	console.log(str);
	return str;
}

//runs our API call to our backend in order to get results for the search
export function fetchCity(city) {


	// Edge case if user enters no value for search parameters
	if (city === '' || !city || city.length <= 5) {
		return {
			type: null,
			payload: null
		};
	}

	//RUN THIS CODE WHEN INCOMPLETE ADDRESS (ONLY WHEN ZIP AND STREET NAME IS AVAILABLE)
	if (city.length === 7) {
		const zipcode = city[6].long_name;
		const streetName = streetCleanup(city[1].short_name);
		const url = `${API_URL}&street_name=${streetName}&zipcode=${zipcode}`;
		const request = axios.get(url);

		if (!request) {
			console.log('no response from server');
			return {
				type: null,
				payload: null
			};
		}
		return {
			type: FETCH_CITY,
			payload: request
		};
	}

	//RUN CODE FOR FULL ADDRESS
	const zipcode = city[7].short_name;
	const streetNumber = city[0].short_name;
	const streetName = streetCleanup(city[1].short_name);
	const url = `${API_URL}${streetNumber}&street_name=${streetName}&zipcode=${zipcode}`;
	const request = axios.get(url);
	return {
		type: FETCH_CITY,
		payload: request
	};
}

//this is run when the user selects the address from the search results
//and updates the application state with the selected address
//so it will know what data to populate
export function selectAddress(address) {
	return {
		type: ADDRESS_SELECTED,
		payload: address
	};
}
