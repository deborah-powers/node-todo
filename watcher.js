import { spawn } from 'child_process'
import { watch } from 'fs'
const [ node, _ ] = process.argv
const file = 'server.js'

function lancerNode(){
    const myProcess = spawn (node, [ file ])
    myProcess.stdout.pipe (process.stdout)
    myProcess.stderr.pipe (process.stderr)
    myProcess.on ('close', (code) =>{ if (code !== null) process.exit (code) })
    return myProcess
}
let myProcess = lancerNode()
let watcher = watch ('./', { recursive: true }, (eventType, fileName)=>{
    // watch peut surveiller un dossier ou un fichier spécifique. recursive permet de surveiller le dossier et ses sous-dossiers
    if (fileName.endsWith ('.js')){
        myProcess.kill ('SIGKILL')
        myProcess = lancerNode()
    }
})
