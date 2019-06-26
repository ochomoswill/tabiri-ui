import * as types from './actionTypes'

/* Country */

/* Get a country */
export const countryRequest = function countryRequest(country) {
	return {
		type: types.COUNTRY_REQUESTING,
		country
	}
};

export const countryRequestSuccess = function countryRequestSuccess(country) {
	return {
		type: types.COUNTRY_REQUEST_SUCCESS,
		country,
	}
};

export const countryRequestError = function countryRequestError(error) {
	return {
		type: types.COUNTRY_REQUEST_ERROR,
		error,
	}
};

export const resetCountryRequest = function resetCountryRequest() {
	return {
		type: types.RESET_COUNTRY_REQUEST
	}
};

/* Get all countries */
export const countriesRequest = function countriesRequest(filterArr) {
	return {
		type: types.COUNTRIES_REQUESTING,
		filterArr
	}
};

export const countriesRequestSuccess = function countriesRequestSuccess(countries) {
	return {
		type: types.COUNTRIES_REQUEST_SUCCESS,
		countries,
	}
};

export const countriesRequestError = function countriesRequestError(error) {
	return {
		type: types.COUNTRIES_REQUEST_ERROR,
		error,
	}
};

export const resetCountriesRequest = function resetCountriesRequest() {
	return {
		type: types.RESET_COUNTRIES_REQUEST
	}
};


/* County */

/* Get a county */
export const countyRequest = function countyRequest(county) {
	return {
		type: types.COUNTY_REQUESTING,
		county
	}
};

export const countyRequestSuccess = function countyRequestSuccess(county) {
	return {
		type: types.COUNTY_REQUEST_SUCCESS,
		county,
	}
};

export const countyRequestError = function countyRequestError(error) {
	return {
		type: types.COUNTY_REQUEST_ERROR,
		error,
	}
};

export const resetCountyRequest = function resetCountyRequest() {
	return {
		type: types.RESET_COUNTY_REQUEST
	}
};

/* Get all counties */
export const countiesRequest = function countiesRequest(filterArr) {
	return {
		type: types.COUNTIES_REQUESTING,
		filterArr
	}
};

export const countiesRequestSuccess = function countiesRequestSuccess(counties) {
	return {
		type: types.COUNTIES_REQUEST_SUCCESS,
		counties,
	}
};

export const countiesRequestError = function countiesRequestError(error) {
	return {
		type: types.COUNTIES_REQUEST_ERROR,
		error,
	}
};

export const resetCountiesRequest = function resetCountiesRequest() {
	return {
		type: types.RESET_COUNTIES_REQUEST
	}
};


/* Constituency */

/* Get a constituency */
export const constituencyRequest = function constituencyRequest(constituency) {
	return {
		type: types.CONSTITUENCY_REQUESTING,
		constituency
	}
};

export const constituencyRequestSuccess = function constituencyRequestSuccess(constituency) {
	return {
		type: types.CONSTITUENCY_REQUEST_SUCCESS,
		constituency,
	}
};

export const constituencyRequestError = function constituencyRequestError(error) {
	return {
		type: types.CONSTITUENCY_REQUEST_ERROR,
		error,
	}
};

export const resetConstituencyRequest = function resetConstituencyRequest() {
	return {
		type: types.RESET_CONSTITUENCY_REQUEST
	}
};

/* Get all constituencies */
export const constituenciesRequest = function constituenciesRequest(filterArr) {
	return {
		type: types.CONSTITUENCIES_REQUESTING,
		filterArr
	}
};

export const constituenciesRequestSuccess = function constituenciesRequestSuccess(constituencies) {
	return {
		type: types.CONSTITUENCIES_REQUEST_SUCCESS,
		constituencies,
	}
};

export const constituenciesRequestError = function constituenciesRequestError(error) {
	return {
		type: types.CONSTITUENCIES_REQUEST_ERROR,
		error,
	}
};

export const resetConstituenciesRequest = function resetConstituenciesRequest() {
	return {
		type: types.RESET_CONSTITUENCIES_REQUEST
	}
};


/* Ward */

/* Get a ward */
export const wardRequest = function wardRequest(ward) {
	return {
		type: types.WARD_REQUESTING,
		ward
	}
};

export const wardRequestSuccess = function wardRequestSuccess(ward) {
	return {
		type: types.WARD_REQUEST_SUCCESS,
		ward,
	}
};

export const wardRequestError = function wardRequestError(error) {
	return {
		type: types.WARD_REQUEST_ERROR,
		error,
	}
};

export const resetWardRequest = function resetWardRequest() {
	return {
		type: types.RESET_WARD_REQUEST
	}
};

/* Get all wards */
export const wardsRequest = function wardsRequest(filterArr) {
	return {
		type: types.WARDS_REQUESTING,
		filterArr
	}
};

export const wardsRequestSuccess = function wardsRequestSuccess(wards) {
	return {
		type: types.WARDS_REQUEST_SUCCESS,
		wards,
	}
};

export const wardsRequestError = function wardsRequestError(error) {
	return {
		type: types.WARDS_REQUEST_ERROR,
		error,
	}
};

export const resetWardsRequest = function resetWardsRequest() {
	return {
		type: types.RESET_WARDS_REQUEST
	}
};


/* HealthFacility */

/* Get a health facility */
export const healthFacilityRequest = function healthFacilityRequest(healthFacility) {
	return {
		type: types.HEALTH_FACILITY_REQUESTING,
		healthFacility
	}
};

export const healthFacilityRequestSuccess = function healthFacilityRequestSuccess(healthFacility) {
	return {
		type: types.HEALTH_FACILITY_REQUEST_SUCCESS,
		healthFacility,
	}
};

export const healthFacilityRequestError = function healthFacilityRequestError(error) {
	return {
		type: types.HEALTH_FACILITY_REQUEST_ERROR,
		error,
	}
};

export const resetHealthFacilityRequest = function resetHealthFacilityRequest() {
	return {
		type: types.RESET_HEALTH_FACILITY_REQUEST
	}
};

/* Get all healthFacilities */
export const healthFacilitiesRequest = function healthFacilitiesRequest(filterArr) {
	return {
		type: types.HEALTH_FACILITIES_REQUESTING,
		filterArr
	}
};

export const healthFacilitiesRequestSuccess = function healthFacilitiesRequestSuccess(healthFacilities) {
	return {
		type: types.HEALTH_FACILITIES_REQUEST_SUCCESS,
		healthFacilities,
	}
};

export const healthFacilitiesRequestError = function healthFacilitiesRequestError(error) {
	return {
		type: types.HEALTH_FACILITIES_REQUEST_ERROR,
		error,
	}
};

export const resetHealthFacilitiesRequest = function resetHealthFacilitiesRequest() {
	return {
		type: types.RESET_HEALTH_FACILITIES_REQUEST
	}
};

