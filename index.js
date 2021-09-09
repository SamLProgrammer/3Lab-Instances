const express = require('express')
const app = express()
const shell = require('shelljs')

const port = 3000
const PATH = process.cwd();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function second() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

function init_bd() {
  shell.exec(PATH + `/database/startbd.sh`);
}

function go() {
  init_bd()
  third();
}

app.post('/monitors', (req, res) => {

})

go();