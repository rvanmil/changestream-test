import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
	reducer: rootReducer,
	middleware: [
		// Thunk is disabled because we use Redux-Saga.
		// SerializableCheck is disabled because we work with BSON objects containing ObjectId properties, which are not serializable.
		// ImmutableCheck is disabled becasuse Redux Toolkit uses Immer which ensures this is never a problem. And because we use Map/Set data structures in the Redux state, which are not supported by this check.
		...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false, thunk: false }),
		sagaMiddleware
	]
})
sagaMiddleware.run(rootSaga)

export default store
