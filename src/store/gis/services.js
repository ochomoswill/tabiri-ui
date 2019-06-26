import globalVariables from "../../utils/global";

export default class GisService {

	static getCountries(reqParams) {
		const url = `/gis/countries`;
		const method = "GET";
		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			params: reqParams.params
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getCountry(reqParams) {
		const url = `/gis/countries/${reqParams.country.id}`;
		const method = "GET";

		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				console.log("Country response ", response);
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}


	static getCounties(reqParams) {
		const url = `/gis/counties`;
		const method = "GET";
		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			params: reqParams.params
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getCounty(reqParams) {
		const url = `/gis/counties/${reqParams.county.id}`;
		const method = "GET";

		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			}
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				console.log("County response ", response);
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}


	static getConstituencies(reqParams) {
		const url = `/gis/constituencies`;
		const method = "GET";
		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			params: reqParams.params
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getConstituency(reqParams) {
		const url = `/gis/constituencies/${reqParams.constituency.id}`;
		const method = "GET";

		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			}
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getWards(reqParams) {
		const url = `/gis/wards`;
		const method = "GET";
		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			params: reqParams.params
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getWard(reqParams) {
		const url = `/gis/wards/${reqParams.ward.id}`;
		const method = "GET";

		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			}
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getHealthFacilities(reqParams) {
		const url = `/gis/health-facilities`;
		const method = "GET";
		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			params: reqParams.params
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}

	static getHealthFacility(reqParams) {
		const url = `/gis/health-facilities/${reqParams.healthFacility.id}`;
		const method = "GET";

		let config = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			}
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response.data
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}
}
