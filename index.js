const express = require('express')
const app = express()
const shell = require('shelljs')
let mysql = require('mysql');

const port = 3000
const PATH = process.cwd();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sampledb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/query', (req, res) => {
  res.send({ id: req.query.id })
})

app.post('/monitors', (req, res) => {

})