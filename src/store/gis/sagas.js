import {call, put, takeLatest} from 'redux-saga/effects'
import * as types from './actionTypes'
import * as actions from './actions'
import GisService from './services'

/* Country */
/* Get Country Flow */
function* countryRequestFlow(action) {
	try {
		const {country} = action;
		const countries = yield call(GisService.getCountry, country);

		yield put(actions.countryRequestSuccess(countries))
	} catch (error) {
		yield put(actions.countryRequestError(error))
	}
}

/* Get Countries Flow */
function* countriesRequestFlow(action) {
	try {
		const {filterArr} = action;
		const countries = yield call(GisService.getCountries, filterArr);

		if (countries.hasOwnProperty("countries")) {
			yield put(actions.countriesRequestSuccess(countries));
			yield put(actions.resetCountriesRequest())
		} else {
			yield put(actions.countriesRequestError(countries.error))
		}
	} catch (error) {
		yield put(actions.countriesRequestError(error))
	}
}


/* County */
/* Get County Flow */
function* countyRequestFlow(action) {
	try {
		const {county} = action;
		const counties = yield call(GisService.getCounty, county);

		yield put(actions.countyRequestSuccess(counties))
	} catch (error) {
		yield put(actions.countyRequestError(error))
	}
}

/* Get Counties Flow */
function* countiesRequestFlow(action) {
	try {
		const {filterArr} = action;
		const counties = yield call(GisService.getCounties, filterArr);

		if (counties.hasOwnProperty("counties")) {
			yield put(actions.countiesRequestSuccess(counties));
			yield put(actions.resetCountiesRequest())
		} else {
			yield put(actions.countiesRequestError(counties.error))
		}
	} catch (error) {
		yield put(actions.countiesRequestError(error))
	}
}


/* Constituency */
/* Get Constituency Flow */
function* constituencyRequestFlow(action) {
	try {
		const {constituency} = action;
		const constituencies = yield call(GisService.getConstituency, constituency);

		yield put(actions.constituencyRequestSuccess(constituencies))
	} catch (error) {
		yield put(actions.constituencyRequestError(error))
	}
}

/* Get Constituencies Flow */
function* constituenciesRequestFlow(action) {
	try {
		const {filterArr} = action;
		const constituencies = yield call(GisService.getConstituencies, filterArr);

		if (constituencies.hasOwnProperty("constituencies")) {
			yield put(actions.constituenciesRequestSuccess(constituencies));
			yield put(actions.resetConstituenciesRequest())
		} else {
			yield put(actions.constituenciesRequestError(constituencies.error))
		}
	} catch (error) {
		yield put(actions.constituenciesRequestError(error))
	}
}


/* Ward */
/* Get Ward Flow */
function* wardRequestFlow(action) {
	try {
		const {ward} = action;
		const wards = yield call(GisService.getWard, ward);

		yield put(actions.wardRequestSuccess(wards))
	} catch (error) {
		yield put(actions.wardRequestError(error))
	}
}

/* Get Wards Flow */
function* wardsRequestFlow(action) {
	try {
		const {filterArr} = action;
		const wards = yield call(GisService.getWards, filterArr);

		if (wards.hasOwnProperty("wards")) {
			yield put(actions.wardsRequestSuccess(wards));
			yield put(actions.resetWardsRequest())
		} else {
			yield put(actions.wardsRequestError(wards.error))
		}
	} catch (error) {
		yield put(actions.wardsRequestError(error))
	}
}


/* HealthFacility */
/* Get HealthFacility Flow */
function* healthFacilityRequestFlow(action) {
	try {
		const {healthFacility} = action;
		const healthFacilities = yield call(GisService.getHealthFacility, healthFacility);

		yield put(actions.healthFacilityRequestSuccess(healthFacilities))
	} catch (error) {
		yield put(actions.healthFacilityRequestError(error))
	}
}

/* Get HealthFacilities Flow */
function* healthFacilitiesRequestFlow(action) {
	try {
		const {filterArr} = action;
		const healthFacilities = yield call(GisService.getHealthFacilities, filterArr);

		//if (healthFacilities.hasOwnProperty("healthFacilities")) {
			yield put(actions.healthFacilitiesRequestSuccess(healthFacilities));
			yield put(actions.resetHealthFacilitiesRequest())
		// } else {
		// 	yield put(actions.healthFacilitiesRequestError(healthFacilities.error))
		// }
	} catch (error) {
		yield put(actions.healthFacilitiesRequestError(error))
	}
}

/* Watcher */
function* gisWatcher() {
	// each of the below RECEIVES the action from the .. action
	yield [
		takeLatest(types.COUNTRY_REQUESTING, countryRequestFlow),
		takeLatest(types.COUNTRIES_REQUESTING, countriesRequestFlow),
		takeLatest(types.COUNTY_REQUESTING, countyRequestFlow),
		takeLatest(types.COUNTIES_REQUESTING, countiesRequestFlow),
		takeLatest(types.CONSTITUENCY_REQUESTING, constituencyRequestFlow),
		takeLatest(types.CONSTITUENCIES_REQUESTING, constituenciesRequestFlow),
		takeLatest(types.WARD_REQUESTING, wardRequestFlow),
		takeLatest(types.WARDS_REQUESTING, wardsRequestFlow),
		takeLatest(types.HEALTH_FACILITY_REQUESTING, healthFacilityRequestFlow),
		takeLatest(types.HEALTH_FACILITIES_REQUESTING, healthFacilitiesRequestFlow),
	]
}

export default gisWatcher
