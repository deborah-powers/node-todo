import { listTasks, createTask, removeTask, updateTask } from './storage-mongo.js'
import { json } from 'stream/consumers'

export async function index (requete, reponse){
    const todos = await listTasks()
    return todos
}
export async function create (requete, reponse){
    const todo = await createTask (requete.body)
    return todo
}
export async function remove (requete, reponse){
    const id= parseInt (requete.query.id, 10)
    await removeTask (id)
}
export async function update (requete, reponse){
    const id= parseInt (requete.query.id, 10)
    const todo = await updateTask (id, requete.body)
    return todo
}