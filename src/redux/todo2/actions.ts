import { createAction } from '@reduxjs/toolkit'
import { InitialTodo, Todo } from '../../types'

export const createTodo2 = createAction<{ todo: InitialTodo }>('todos2/create')

export const fetchTodos2 = createAction('todos2/fetch')
export const fetchTodos2Request = createAction('todos2/fetch/request')
export const fetchTodos2Success = createAction<{ todos: Todo[] }>('todos2/fetch/success')
export const fetchTodos2Failure = createAction('todos2/fetch/failure')

export const openTodos2Watch = createAction('todos2/watch/open')
export const addTodo2FromWatch = createAction<{ todo: Todo }>('todos2/watch/add')
