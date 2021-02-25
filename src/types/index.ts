import * as Realm from 'realm-web'

export interface InitialTodo {
	description: string,
	completed: boolean
}

export interface Todo extends InitialTodo {
	_id: Realm.BSON.ObjectId
}
