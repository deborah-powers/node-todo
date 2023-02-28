import { listTasks, createTask, removeTask, updateTask } from './storage-json.js'
import { json } from 'stream/consumers'

export async function index (requete, reponse){
    const todos = await listTasks()
    return todos
}
export async function create (requete, reponse){
    const newTodo = await json (requete)
    const todos = await createTask (newTodo)
    return todos
}
export async function remove (requete, reponse, url){
    const id= parseInt (url.searchParams.get ('id'), 10)
    await removeTask (id)
    reponse.writeHead (204) // 204 indique que nous ne renvoyons rien
}
export async function update (requete, reponse, url){
    const id= parseInt (url.searchParams.get ('id'), 10)
    const newTodo = await json (requete)
    const todo = await updateTask (id, newTodo)
    return todo
}