import { Store } from '@reduxjs/toolkit'
import { todo1Collection, todo2Collection } from '..'
import { addTodo1FromWatch, removeTodo1FromWatch } from '../../redux/todo1/actions'
import { addTodo2FromWatch, removeTodo2FromWatch } from '../../redux/todo2/actions'

let store: Store

export const initTodosWatch = (s: Store): void => {
	store = s
}

export const openTodos1Watch = async (): Promise<void> => {
	for await (const change of todo1Collection().watch()) {
		if (change.operationType === 'insert' && change.fullDocument) {
			console.log('Change stream received new todo 1', change)
			store.dispatch(addTodo1FromWatch({ todo: change.fullDocument }))
		}
		if (change.operationType === 'delete') {
			console.log('Change stream received new todo 1', change)
			store.dispatch(removeTodo1FromWatch({ _id: change.documentKey._id }))
		}
	}
}

export const openTodos2Watch = async (): Promise<void> => {
	for await (const change of todo2Collection().watch()) {
		if (change.operationType === 'insert' && change.fullDocument) {
			console.log('Change stream received new todo 2', change)
			store.dispatch(addTodo2FromWatch({ todo: change.fullDocument }))
		}
		if (change.operationType === 'delete') {
			console.log('Change stream received new todo 2', change)
			store.dispatch(removeTodo2FromWatch({ _id: change.documentKey._id }))
		}
	}
}
