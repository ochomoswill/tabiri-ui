export function getCountries(state) {
  const allCountries = state.gisReducer.countries;

  return {
    name: `Countries`,
    tracker: state.gisReducer.countriesTracker,
    timestamp: state.gisReducer.countriesTimestamp,
    data: allCountries.countries,
    noRecordMessage: `No Countries Found`,
  }
}

export function getCountry(state) {
  return {
    name: 'Country',
    tracker: state.gisReducer.countryTracker,
    timestamp: state.gisReducer.countryTimestamp,
    data: state.gisReducer.country,
    noRecordMessage: 'No Country Found',
  }
}


export function getCounties(state) {
  const allCounties = state.gisReducer.counties;

  return {
    name: `Counties`,
    tracker: state.gisReducer.countiesTracker,
    timestamp: state.gisReducer.countiesTimestamp,
    data: allCounties.counties,
    noRecordMessage: `No Counties Found`,
  }
}

export function getCounty(state) {
  return {
    name: 'County',
    tracker: state.gisReducer.countyTracker,
    timestamp: state.gisReducer.countyTimestamp,
    data: state.gisReducer.county,
    noRecordMessage: 'No County Found',
  }
}


export function getConstituencies(state) {
  const allConstituencies = state.gisReducer.constituencies;

  return {
    name: `Constituencies`,
    tracker: state.gisReducer.constituenciesTracker,
    timestamp: state.gisReducer.constituenciesTimestamp,
    data: allConstituencies.constituencies,
    noRecordMessage: `No Constituencies Found`,
  }
}

export function getConstituency(state) {
  return {
    name: 'Constituency',
    tracker: state.gisReducer.constituencyTracker,
    timestamp: state.gisReducer.constituencyTimestamp,
    data: state.gisReducer.constituency,
    noRecordMessage: 'No Constituency Found',
  }
}


export function getWards(state) {
  const allWards = state.gisReducer.wards;

  return {
    name: `Wards`,
    tracker: state.gisReducer.wardsTracker,
    timestamp: state.gisReducer.wardsTimestamp,
    data: allWards.wards,
    noRecordMessage: `No Wards Found`,
  }
}

export function getWard(state) {
  return {
    name: 'Ward',
    tracker: state.gisReducer.wardTracker,
    timestamp: state.gisReducer.wardTimestamp,
    data: state.gisReducer.ward,
    noRecordMessage: 'No Ward Found',
  }
}


export function getHealthFacilities(state) {
  const allHealthFacilities = state.gisReducer.healthFacilities;

  return {
    name: `HealthFacilities`,
    tracker: state.gisReducer.healthFacilitiesTracker,
    timestamp: state.gisReducer.healthFacilitiesTimestamp,
    data: allHealthFacilities,
    noRecordMessage: `No HealthFacilities Found`,
  }
}

export function getHealthFacility(state) {
  return {
    name: 'HealthFacility',
    tracker: state.gisReducer.healthFacilityTracker,
    timestamp: state.gisReducer.healthFacilityTimestamp,
    data: state.gisReducer.healthFacility,
    noRecordMessage: 'No HealthFacility Found',
  }
}
