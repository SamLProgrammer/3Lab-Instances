const express = require('express')
const app = express()
const shell = require('shelljs')
let mysql = require('mysql');
const { spawn } = require('child_process');

const port = 3000
const PATH = process.cwd();

app.get('/cpuStatus', (req, res) => {
  const ls = spawn('bash', ['./bashes/cpuMonitor.sh']);
  ls.stdout.on('data', (data) => {
    res.send({cpu: data.toString()});
  });
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
})

app.get('/ramStatus', (req, res) => {
  require("child_process").spawn('bash', ['./bashes/ramMonitor.sh'], {
    cwd: process.cwd(),
    detached: true,
    stdio: "inherit"
  }).on('data', (data) => {
  });
  res.send({ram: data})
})

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sampledb"
});

app.get('/', (req, res) => {
  res.send('hello mai boi')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/query', (req, res) => {
  res.send({ id: req.query.id })
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT user_name FROM users where user_id = " + req.query.id, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result)
    });
  });
})

app.post('/monitors', (req, res) => {

})