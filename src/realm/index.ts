import * as Realm from 'realm-web'
import { Todo } from '../types'

const realmAppId = process.env.REACT_APP_REALM_APP_ID || ''
const realmDbName = process.env.REACT_APP_REALM_DB_NAME || ''

// Create the Realm app (if not already created)
export const realmApp = new Realm.App({ id: realmAppId })
let user: Realm.User

// Initialize Realm Query Anywhere
export const todo1Collection = () => user.mongoClient('mongodb-atlas').db(realmDbName).collection<Todo>('todo1')
export const todo2Collection = () => user.mongoClient('mongodb-atlas').db(realmDbName).collection<Todo>('todo2')

// Login
export const login = async (): Promise<Realm.User> => {
	user = await realmApp.logIn(Realm.Credentials.anonymous())
	return user
}

// Logout
export const logout = (): void => {
	if (realmApp.currentUser) {
		realmApp.currentUser.logOut()
	}
}

// Create an ObjectId
export const createId = (): Realm.BSON.ObjectId => new Realm.BSON.ObjectId()

// User
export const getRealmUser = (): Realm.User | undefined => user
export const getAppMetadata = () => user.profile.app_metadata
