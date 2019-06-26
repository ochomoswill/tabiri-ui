import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
	/* Get all countries */
	countries: [],
	countriesTracker: {status: 'idle'},
	countriesTimestamp: undefined,

	/* Get a country */
	country: [],
	countryTracker: {status: 'idle'},
	countryTimestamp: undefined,

	/* Get all counties */
	counties: [],
	countiesTracker: {status: 'idle'},
	countiesTimestamp: undefined,

	/* Get a county */
	county: [],
	countyTracker: {status: 'idle'},
	countyTimestamp: undefined,

	/* Get all constituencies */
	constituencies: [],
	constituenciesTracker: {status: 'idle'},
	constituenciesTimestamp: undefined,

	/* Get a constituency */
	constituency: [],
	constituencyTracker: {status: 'idle'},
	constituencyTimestamp: undefined,

	/* Get all wards */
	wards: [],
	wardsTracker: {status: 'idle'},
	wardsTimestamp: undefined,

	/* Get a ward */
	ward: [],
	wardTracker: {status: 'idle'},
	wardTimestamp: undefined,

	/* Get all healthFacilities */
	healthFacilities: [],
	healthFacilitiesTracker: {status: 'idle'},
	healthFacilitiesTimestamp: undefined,

	/* Get a healthFacility */
	healthFacility: [],
	healthFacilityTracker: {status: 'idle'},
	healthFacilityTimestamp: undefined,
});

const reducer = function gisReducer(state = initialState, action) {
	switch (action.type) {

		/* Country */
		/* Get a country */
		case types.COUNTRY_REQUESTING:
			return state.merge({
				countryTracker: {status: 'processing'},
			});

		case types.COUNTRY_REQUEST_SUCCESS:
			console.log("At reducer ", action.country);
			return state.merge({
				countryTracker: {status: 'success'},
				country: action.country,
				countryTimestamp: action.timestamp,
			});

		case types.COUNTRY_REQUEST_ERROR:
			return state.merge({
				countryTracker: {
					status: 'error',
					errors: action.error,
				},
				countryTimestamp: action.timestamp,
			});

		case types.RESET_COUNTRY_REQUEST:
			return state.merge({
				countryTracker: {status: 'idle'},
			});

		/* Get countries */
		case types.COUNTRIES_REQUESTING:
			return state.merge({
				countriesTracker: {status: 'processing'},
			});

		case types.COUNTRIES_REQUEST_SUCCESS:
			return state.merge({
				countriesTracker: {status: 'success'},
				countries: action.countries,
				countriesTimestamp: action.timestamp,
			});

		case types.COUNTRIES_REQUEST_ERROR:
			return state.merge({
				countriesTracker: {
					status: 'error',
					errors: action.error,
				},
				countriesTimestamp: action.timestamp,
			});

		case types.RESET_COUNTRIES_REQUEST:
			return state.merge({
				countriesTracker: {status: 'idle'},
			});

		/* County */
		/* Get a county */
		case types.COUNTY_REQUESTING:
			return state.merge({
				countyTracker: {status: 'processing'},
			});

		case types.COUNTY_REQUEST_SUCCESS:
			return state.merge({
				county: action.county,
				countyTracker: {status: 'success'},
				countyTimestamp: action.timestamp,
			});

		case types.COUNTY_REQUEST_ERROR:
			return state.merge({
				countyTracker: {
					status: 'error',
					errors: action.error,
				},
				countyTimestamp: action.timestamp,
			});

		case types.RESET_COUNTY_REQUEST:
			return state.merge({
				countyTracker: {status: 'idle'},
			});

		/* Get counties */
		case types.COUNTIES_REQUESTING:
			return state.merge({
				countiesTracker: {status: 'processing'},
			});

		case types.COUNTIES_REQUEST_SUCCESS:
			return state.merge({
				countiesTracker: {status: 'success'},
				counties: action.counties,
				countiesTimestamp: action.timestamp,
			});

		case types.COUNTIES_REQUEST_ERROR:
			return state.merge({
				countiesTracker: {
					status: 'error',
					errors: action.error,
				},
				countiesTimestamp: action.timestamp,
			});

		case types.RESET_COUNTIES_REQUEST:
			return state.merge({
				countiesTracker: {status: 'idle'},
			});


		/* Constituency */
		/* Get a constituency */
		case types.CONSTITUENCY_REQUESTING:
			return state.merge({
				constituencyTracker: {status: 'processing'},
			});

		case types.CONSTITUENCY_REQUEST_SUCCESS:
			return state.merge({
				constituency: action.constituency,
				constituencyTracker: {status: 'success'},
				constituencyTimestamp: action.timestamp,
			});

		case types.CONSTITUENCY_REQUEST_ERROR:
			return state.merge({
				constituencyTracker: {
					status: 'error',
					errors: action.error,
				},
				constituencyTimestamp: action.timestamp,
			});

		case types.RESET_CONSTITUENCY_REQUEST:
			return state.merge({
				constituencyTracker: {status: 'idle'},
			});

		/* Get constituencies */
		case types.CONSTITUENCIES_REQUESTING:
			return state.merge({
				constituenciesTracker: {status: 'processing'},
			});

		case types.CONSTITUENCIES_REQUEST_SUCCESS:
			return state.merge({
				constituenciesTracker: {status: 'success'},
				constituencies: action.constituencies,
				constituenciesTimestamp: action.timestamp,
			});

		case types.CONSTITUENCIES_REQUEST_ERROR:
			return state.merge({
				constituenciesTracker: {
					status: 'error',
					errors: action.error,
				},
				constituenciesTimestamp: action.timestamp,
			});

		case types.RESET_CONSTITUENCIES_REQUEST:
			return state.merge({
				constituenciesTracker: {status: 'idle'},
			});


		/* Ward */
		/* Get a ward */
		case types.WARD_REQUESTING:
			return state.merge({
				wardTracker: {status: 'processing'},
			});

		case types.WARD_REQUEST_SUCCESS:
			return state.merge({
				ward: action.ward,
				wardTracker: {status: 'success'},
				wardTimestamp: action.timestamp,
			});

		case types.WARD_REQUEST_ERROR:
			return state.merge({
				wardTracker: {
					status: 'error',
					errors: action.error,
				},
				wardTimestamp: action.timestamp,
			});

		case types.RESET_WARD_REQUEST:
			return state.merge({
				wardTracker: {status: 'idle'},
			});

		/* Get wards */
		case types.WARDS_REQUESTING:
			return state.merge({
				wardsTracker: {status: 'processing'},
			});

		case types.WARDS_REQUEST_SUCCESS:
			return state.merge({
				wardsTracker: {status: 'success'},
				wards: action.wards,
				wardsTimestamp: action.timestamp,
			});

		case types.WARDS_REQUEST_ERROR:
			return state.merge({
				wardsTracker: {
					status: 'error',
					errors: action.error,
				},
				wardsTimestamp: action.timestamp,
			});

		case types.RESET_WARDS_REQUEST:
			return state.merge({
				wardsTracker: {status: 'idle'},
			});


		/* HealthFacility */
		/* Get a healthFacility */
		case types.HEALTH_FACILITY_REQUESTING:
			return state.merge({
				healthFacilityTracker: {status: 'processing'},
			});

		case types.HEALTH_FACILITY_REQUEST_SUCCESS:
			return state.merge({
				healthFacility: action.healthFacility,
				healthFacilityTracker: {status: 'success'},
				healthFacilityTimestamp: action.timestamp,
			});

		case types.HEALTH_FACILITY_REQUEST_ERROR:
			return state.merge({
				healthFacilityTracker: {
					status: 'error',
					errors: action.error,
				},
				healthFacilityTimestamp: action.timestamp,
			});

		case types.RESET_HEALTH_FACILITY_REQUEST:
			return state.merge({
				healthFacilityTracker: {status: 'idle'},
			});

		/* Get healthFacilities */
		case types.HEALTH_FACILITIES_REQUESTING:
			return state.merge({
				healthFacilitiesTracker: {status: 'processing'},
			});

		case types.HEALTH_FACILITIES_REQUEST_SUCCESS:
			return state.merge({
				healthFacilitiesTracker: {status: 'success'},
				healthFacilities: action.healthFacilities,
				healthFacilitiesTimestamp: action.timestamp,
			});

		case types.HEALTH_FACILITIES_REQUEST_ERROR:
			return state.merge({
				healthFacilitiesTracker: {
					status: 'error',
					errors: action.error,
				},
				healthFacilitiesTimestamp: action.timestamp,
			});

		case types.RESET_HEALTH_FACILITIES_REQUEST:
			return state.merge({
				healthFacilitiesTracker: {status: 'idle'},
			});

		default:
			return state
	}
};

export default reducer
