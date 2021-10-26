const express = require('express')
const axios = require('axios')
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

const notifyExistence = () => {
  const ls = spawn('bash', ['./bashes/getIP.sh']);
  ls.stdout.on('data', (data) => {
    const ip = data.toString();
    console.log(ip);
    const index = ip.split('.');
    let final_index = index[index.length-1].replace(/(\r\n|\n|\r)/gm,"");
    axios.post('http://192.168.56.1:8000/notifyExistence',{index : final_index.tirm()});
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
  notifyExistence();
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