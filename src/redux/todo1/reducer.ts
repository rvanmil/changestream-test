import { combineReducers, createReducer } from '@reduxjs/toolkit'
import { Todo } from '../../types'
import * as actions from './actions'

const todosMapReducer = createReducer(new Map<string, Todo>(), builder => builder
	// Fetch todos
	.addCase(actions.fetchTodos1Request, (state) => {
		state.clear()
	})
	.addCase(actions.fetchTodos1Success, (state, action) => {
		action.payload.todos.forEach(todo => state.set(todo._id.toHexString(), todo))
	})
	.addCase(actions.fetchTodos1Failure, (state) => {
		state.clear()
	})
	.addCase(actions.addTodo1FromWatch, (state, action) => {
		state.set(action.payload.todo._id.toHexString(), action.payload.todo)
	})
	.addCase(actions.removeTodo1FromWatch, (state, action) => {
		state.delete(action.payload._id.toHexString())
	}))

const metaReducer = createReducer({ isLoading: false }, builder => builder
	.addCase(actions.fetchTodos1Request, (state) => {
		state.isLoading = true
	})
	.addCase(actions.fetchTodos1Success, (state) => {
		state.isLoading = false
	})
	.addCase(actions.fetchTodos1Failure, (state) => {
		state.isLoading = false
	}))

export default combineReducers({
	todosMap: todosMapReducer,
	meta: metaReducer
})
