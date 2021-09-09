const express = require('express')
const app = express()
const shell = require('shelljs')

const port = 3000
const PATH = process.cwd();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

function first() {
  var child = require('child_process').exec(PATH + `/database/startdb.sh`)
child.stdout.pipe(process.stdout)
child.on('exit', function() {
  process.exit()
});
}

function second() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

function third() {
  shell.exec(PATH + `/database/copy.sh`);
}

function go() {
  first();
  second();
  third();
}

app.post('/monitors', (req, res) => {

})

go();