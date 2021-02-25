import { combineReducers } from '@reduxjs/toolkit'
import todos1Reducer from './todo1/reducer'
import todos2Reducer from './todo2/reducer'

const rootReducer = combineReducers({
	todos1State: todos1Reducer,
	todos2State: todos2Reducer
})

export default rootReducer
