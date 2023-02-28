import { createServer } from 'http'
import { index, create, remove, update } from './requetes-basic.js'
import { NotFoundError } from './errors.js'

const server = createServer (async (requete, reponse) =>{
    reponse.setHeader ('Content-Type', 'application/json')
    try{
        const url = new URL (requete.url, `http://${requete.headers.host}`)
        console.log ('serveur: http://localhost:1909/todos')

        const endpoint = `${requete.method}:${url.pathname}`
        let result
        switch (endpoint){
            case 'GET:/todos':
                result = await index (requete, reponse)
                break;
            case 'POST:/todos':
                result = await create (requete, reponse)
                break;
            case 'DELETE:/todos':
                await remove (requete, reponse, url)
                break;
            case 'PUT:/todos':
                result = await update (requete, reponse, url)
                break;
            default:
                reponse.writeHead (404)
        }
        if (result) reponse.write (JSON.stringify (result))
    }
    catch (erreur){
        if (erreur instanceof NotFoundError) reponse.writeHead (404)
        else throw erreur
    }
    reponse.end()
}).listen ('1909')
