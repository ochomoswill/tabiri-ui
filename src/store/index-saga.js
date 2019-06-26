import {all} from "redux-saga/effects";
import gisSaga from './gis/sagas'

export default function* rootSaga(getState) {
	yield all([
		gisSaga()
	]);
}
