import HttpClient from './httpClient'

const OfficeIP = "http://172.17.21.21:81";
const AnyWhereElseIP = "http://41.89.64.13:9000/api";

const AppEndpoint = 'http://34.222.109.38';
const Port = "8000";
const host = 'http://34.222.109.38';

const DefaultRedirectRoute = "/main/dashboard";

/* Session Data */
let sessionTime = 1800;
let sessionTimeUnit = 's';
let expiryAllowance = 60;
let si_unit = "minutes";

//const client = new HttpClient(AppEndpoint, Port);
const client = new HttpClient(AppEndpoint);

function makeRequest(method, url, config, withAuth = false) {
	return client.makeRequest(method, url, config, withAuth)
}

function getAuthToken() {
	if (localStorage.getItem('app.Authorization')) {
		return JSON.parse(localStorage.getItem('app.Authorization')).accessToken
	} else {
		return undefined
	}
}

function getUserDetails() {
	if (localStorage.getItem('app.Authorization')) {
		return JSON.parse(localStorage.getItem('app.Authorization')).userAccountById
	} else {
		return undefined
	}
}

function getLogInTime() {
	if (localStorage.getItem('app.init')) {
		return JSON.parse(localStorage.getItem('app.init'))
	} else {
		return undefined
	}
}

function logout() {
	if(localStorage.hasOwnProperty("app.Authorization")){
		localStorage.removeItem('app.Authorization');
	}

	if(localStorage.hasOwnProperty("app.init")){
		localStorage.removeItem('app.init');
	}


}

export default {
	AppEndpoint,
	host,
	getAuthToken,
	getUserDetails,
	DefaultRedirectRoute,
	makeRequest,
	logout,
	OfficeIP,
	AnyWhereElseIP,
	getLogInTime,
	sessionTime,
	sessionTimeUnit,
	expiryAllowance,
	si_unit,
}
