import * as Realm from 'realm-web'
import { createAction } from '@reduxjs/toolkit'
import { InitialTodo, Todo } from '../../types'

export const createTodo1 = createAction<{ todo: InitialTodo }>('todos1/create')
export const clearAll1 = createAction('todos1/clear')

export const fetchTodos1 = createAction('todos1/fetch')
export const fetchTodos1Request = createAction('todos1/fetch/request')
export const fetchTodos1Success = createAction<{ todos: Todo[] }>('todos1/fetch/success')
export const fetchTodos1Failure = createAction('todos1/fetch/failure')

export const openTodos1Watch = createAction('todos1/watch/open')
export const addTodo1FromWatch = createAction<{ todo: Todo }>('todos1/watch/add')
export const removeTodo1FromWatch = createAction<{ _id: Realm.BSON.ObjectId }>('todos1/watch/remove')
