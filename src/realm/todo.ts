import * as Realm from 'realm-web'
import { todo1Collection, todo2Collection } from '.'
import { InitialTodo } from '../types'

export const getTodos1 = async () => todo1Collection().find()
export const getTodo1 = async (_id: Realm.BSON.ObjectId) => todo1Collection().findOne({ _id })
export const addTodo1 = async (todo: InitialTodo) => todo1Collection().insertOne(todo)
export const clearAll1 = async () => todo1Collection().deleteMany({})

export const getTodos2 = async () => todo2Collection().find()
export const getTodo2 = async (_id: Realm.BSON.ObjectId) => todo2Collection().findOne({ _id })
export const addTodo2 = async (todo: InitialTodo) => todo2Collection().insertOne(todo)
export const clearAll2 = async () => todo2Collection().deleteMany({})
