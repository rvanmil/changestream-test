import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'
import * as realmStreams from '../../realm/streams/todo'
import { addTodo1, getTodos1 } from '../../realm/todo'
import { Todo } from '../../types'

// Will open the todos watch
function* openTodos1Watch(): any {
	while (true) {
		yield take(actions.openTodos1Watch)
		try {
			yield call(realmStreams.openTodos1Watch)
		} catch (error) {
			console.error(error)
		}
	}
}

// Will fetch all todos
function* fetchAll() {
	while (true) {
		yield take(actions.fetchTodos1)
		yield put(actions.fetchTodos1Request())
		try {
			const todos: Todo[] = yield call(getTodos1)
			yield put(actions.fetchTodos1Success({ todos }))
		} catch (error) {
			console.error(error)
			yield put(actions.fetchTodos1Failure())
		}
	}
}

// Will create a todo
function* create(action: any): any {
	if (actions.createTodo1.match(action)) {
		const { todo } = action.payload
		try {
			yield call(addTodo1, todo)
		} catch (error) {
			console.error(error)
		}
	}
}

// Will handle every create action
function* watchCreate() {
	yield takeEvery(actions.createTodo1, create)
}

export default function* rootSaga(): any {
	yield all([
		fetchAll,
		openTodos1Watch,
		watchCreate
	].map(saga => fork(saga)))
}
