import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'
import * as realmStreams from '../../realm/streams/todo'
import { addTodo2, clearAll2, getTodos2 } from '../../realm/todo'
import { Todo } from '../../types'

// Will open the todos watch
function* openTodos2Watch(): any {
	while (true) {
		yield take(actions.openTodos2Watch)
		try {
			yield call(realmStreams.openTodos2Watch)
		} catch (error) {
			console.error(error)
		}
	}
}

// Will fetch all todos
function* fetchAll() {
	while (true) {
		yield take(actions.fetchTodos2)
		yield put(actions.fetchTodos2Request())
		try {
			const todos: Todo[] = yield call(getTodos2)
			yield put(actions.fetchTodos2Success({ todos }))
		} catch (error) {
			console.error(error)
			yield put(actions.fetchTodos2Failure())
		}
	}
}

// Will create a todo
function* create(action: any): any {
	if (actions.createTodo2.match(action)) {
		const { todo } = action.payload
		try {
			yield call(addTodo2, todo)
		} catch (error) {
			console.error(error)
		}
	}
}

// Will handle every create action
function* watchCreate() {
	yield takeEvery(actions.createTodo2, create)
}

// Will clearAll a todo
function* clearAll(action: any): any {
	if (actions.clearAll2.match(action)) {
		try {
			yield call(clearAll2)
		} catch (error) {
			console.error(error)
		}
	}
}

// Will handle every clearAll action
function* watchClearAll() {
	yield takeEvery(actions.clearAll2, clearAll)
}

export default function* rootSaga(): any {
	yield all([
		fetchAll,
		openTodos2Watch,
		watchCreate,
		watchClearAll
	].map(saga => fork(saga)))
}
