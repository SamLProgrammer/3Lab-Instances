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
    const cpuUsage = data.toString();
    console.log(' float cpu ' + parseFloat(cpuUsage.substring(0,cpuUsage.length-2)))
    res.send({cpu: cpuUsage.substring(0,cpuUsage.length-2)});
  });
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
})

const readIP = () => {
  const ls = spawn('bash', ['./bashes/getIP.sh']);
  ls.stdout.on('data', (data) => {
    const ip = data.toString();
    const index = ip.charAt(ip.length);
    console.log('My index: ' +  index);
  });
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}


app.get('/ramStatus', (req, res) => {
  const ls = spawn('bash', ['./bashes/ramMonitor.sh']);
  ls.stdout.on('data', (data) => {
    const ramUsage = data.toString();
    console.log(' float ram ' + parseFloat(ramUsage.substring(0,ramUsage.length-2)))
    res.send({ram: ramUsage.substring(0, ramUsage.length-2)});
  });
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
})

const notifyExistence = () => {

}

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
  readIP();
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