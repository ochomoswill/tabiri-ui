import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import gisReducer from './gis/reducers'

const reducers = combineReducers({
	routing: routerReducer,
	gisReducer
});

export default reducers;
