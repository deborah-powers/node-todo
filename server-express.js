import Express, { response } from 'express';
import { index, create, update, remove } from './requetes-express.js'
import { NotFoundError } from './errors.js'

let server = new Express()
server.use (Express.json())
console.log ('serveur: http://localhost:1407/todos')

server.get ('/todos', async (requete, reponse)=>{
    reponse.setHeader ('Content-Type', 'application/json')
    /*
    console.log ('requête', requete)
    console.log ('réponse', reponse)
    */
    const resultJson = await index (requete, reponse)
    const resultString = JSON.stringify (resultJson)
    reponse.send (resultString)
})
server.post ('/todos', async (requete, reponse)=>{
    const resultJson = await create (requete, reponse)
    console.log ('server resu', resultJson)
    const resultString = JSON.stringify (resultJson)
    reponse.send (resultString)
})
server.delete ('/todos', async (requete, reponse)=>{
    try {
        await remove (requete, reponse)
        reponse.send (204)
    } catch (erreur) {
        if (erreur instanceof NotFoundError) reponse.send (404, "<h1>aucune tâche ne porte l'id "+ requete.query.id +'</h1>')
        else reponse.send (400, '<h1>erreur inconnue</h1>')
    }
})
server.put ('/todos', async (requete, reponse)=>{
    try {
        const resultJson = await update (requete, reponse)
        const resultString = JSON.stringify (resultJson)
        reponse.send (resultString)
    } catch (erreur) {
        if (erreur instanceof NotFoundError) reponse.send (404, "<h1>aucune tâche ne porte l'id "+ requete.query.id +'</h1>')
        else reponse.send (400, '<h1>erreur inconnue</h1>')
    }
})
server.put ('/todos/:id', async (requete, reponse)=>{
    // http:localhost:1407/todos/12?id=14   requete.params et requete.query
    console.log ('params', requete.params, requete.query)
    response.send ('ok')
})
server.get ('/', (requete, reponse)=>{
    reponse.send ('<p>vous êtes sur la racine.</p><p>rechercher /todos</p>')
})
server.get ('/*', (requete, reponse)=>{
    reponse.send ("<p>cette page n'existe pas.</p><p>rechercher /todos</p>")
})
server.listen (1407)
