import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../realm'
import Todos from '../Todos/Todos'
import { fetchTodos1, openTodos1Watch } from '../../redux/todo1/actions'
import { fetchTodos2, openTodos2Watch } from '../../redux/todo2/actions'

const App: React.FC = () => {
	const dispatch = useDispatch()
	const [realmReady, setRealmReady] = useState(false)
	const [authorized, setAuthorized] = useState(false)

	// Immediately login to Realm
	useEffect(() => {
		const loginToRealm = async () => {
			await login()
			setAuthorized(true)
			setRealmReady(true)
		}
		if (!realmReady) {
			loginToRealm()
		}
	}, [realmReady])

	// Fetch all required data when Realm is ready
	useEffect(() => {
		if (realmReady && authorized) {
			dispatch(fetchTodos1())
			dispatch(fetchTodos2())
		}
	}, [dispatch, realmReady, authorized])

	// Open streams when Realm is ready and the user is authorized
	useEffect(() => {
		if (realmReady && authorized) {
			dispatch(openTodos1Watch())
			dispatch(openTodos2Watch())
		}
	}, [dispatch, realmReady, authorized])

	if (!realmReady) {
		return <div>Logging in...</div>
	}

	if (!authorized) {
		return <div>Unauthorized</div>
	}

	return <div style={{ margin: 8 }}><Todos /></div>
}

export default App
