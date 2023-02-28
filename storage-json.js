import { readFile, writeFile } from "fs/promises"
import { NotFoundError } from './errors.js'

const pathData = './todo.json'

export async function listTasks(){
    // renvoi une promesse
    const data = await (readFile (pathData, 'utf8'))
    return JSON.parse (data)
}
export async function createTask ({ title, completed=false }){
    const newTodo = { title, completed, id: Date.now() }
    const todoList = [ newTodo, ...await listTasks()]    // rajouter newTodo au début de la liste
    const todoJson = JSON.stringify (todoList, null, 2)
    await writeFile (pathData, todoJson)
    return todoList
}
export async function removeTask (id){
    const oldList = await listTasks()
    const todoId = oldList.findIndex (todo => todo.id ===id)
    if (todoId ===-1) throw new NotFoundError()
    const newList = oldList.filter (todo => todo.id !==id)
    const newJson = JSON.stringify (newList, null, 2)
    await writeFile (pathData, newJson)
}
async function removeTaskSimply (id){
    const oldList = await listTasks()
    const newList = oldList.filter (todo => todo.id !== id)
    const newJson = JSON.stringify (newList)
    await writeFile (pathData, newJson)
}
export async function updateTask (id, partialTodo){
    let oldList = await listTasks()
    const todoId = oldList.findIndex (todo => todo.id ===id)
    if (todoId ===-1) throw new NotFoundError()
    Object.assign (oldList[todoId], partialTodo)
    const newJson = JSON.stringify (oldList, null, 2)
    await writeFile (pathData, newJson)
    return oldList[todoId]
}
async function updateTaskSimply (id, { title, completed }){
    const oldList = await listTasks()
    const todo = oldList.findIndex (todo => todo.id ===id)
    if (todo ===-1) throw new NotFoundError()
    todo.title = title,
    todo.completed = completed
    const newJson = JSON.stringify (oldList)
    await writeFile (pathData, newJson)
    return todo
}
