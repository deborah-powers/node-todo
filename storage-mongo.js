import { MongoClient } from 'mongodb'
import { NotFoundError } from './errors.js'

const client = new MongoClient ('mongodb://127.0.0.1:27017', {})

await client.connect()
const database = client.db ('tuto')
const collec = database.collection ('todo')

export async function listTasks(){
    const todoList = await collec.find().toArray()
    return todoList
}
export async function createTask ({ title, completed=false }){
    const newTodo = { title, completed, id: Date.now() }
    const todoCreated = await collec.insertOne (newTodo)
    const todoList = [ newTodo, ...await listTasks()]    // rajouter newTodo au début de la liste
    return todoList
}
export async function removeTask (id){
    const oldList = await listTasks()
    const todoId = oldList.findIndex (todo => todo.id === id)
    if (todoId ===-1) throw new NotFoundError()
    const todoDeleted = await collec.deleteOne ({ id: id })
}
export async function updateTask (id, partialTodo){
    let oldList = await listTasks()
    const todoId = oldList.findIndex (todo => todo.id === id)
    if (todoId ===-1) throw new NotFoundError()
    Object.assign (oldList[todoId], partialTodo)
    const todoUpdated = await collec.updateOne ({ id: id }, { $set: partialTodo })
    return oldList[todoId]
}