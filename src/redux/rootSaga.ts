import { all, fork } from 'redux-saga/effects'
import todos1Saga from './todo1/saga'
import todos2Saga from './todo2/saga'

function* rootSaga(): any {
	yield all([
		todos1Saga,
		todos2Saga
	].map(saga => fork(saga)))
}

export default rootSaga
