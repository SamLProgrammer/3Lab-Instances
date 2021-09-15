const express = require('express')
const app = express()
const shell = require('shelljs')
let mysql = require('mysql');
const { spawn } = require('child_process');

const port = 3000
const PATH = process.cwd();

const ls = spawn("ls", ["-la"]);

app.get('/cpuStatus', (req, res) => {
  ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
    console.log('1')
    res.send({ msg: data })
  });

  ls.stderr.on("data", data => {
    console.log('2')
    console.log(`stderr: ${data}`);
  });
  
  ls.on('error', (error) => {
    console.log('3')
    console.log(`error: ${error.message}`);
  });
  
  ls.on("close", code => {
    console.log('4')
    console.log(`child process exited with code ${code}`);
  });
})


// app.get('/cpuStatus', (req, res) => {
//   exec('sh bashes/cpuMonitor.sh',
//   (error, stdout, stderr) => {
//       console.log(stdout);
//       res.send({msg: stdout});
//       console.log(stderr);
//       if (error !== null) {
//           console.log(`exec error: ${error}`);
//       }
//   });
// })

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