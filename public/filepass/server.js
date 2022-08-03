const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const fs = require('fs');
const csv = require('fast-csv');
const mysql = require('mysql2')
const multer = require('multer');
const path = require('path');


app.use(express.static('./public'))
app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'mydb',
})
db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message)
  }
  console.log('Database connected.')
})
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname+'-'+(Math.random(10)+1)+'-'+ Date.now() +path.extname(file.originalname),
    )
  },
})

var upload = multer({
  storage: storage,
},{limits : {fieldNameSize : 10}}).array('uploadfile',2)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
//.array('uploadfile',2)
//upload.single('uploadfile')
app.post('/api/uploadcsv',upload, (req, res) => {
    Object.keys(req.files).map(keys=>{
        csvToDb(__dirname + '/uploads/' + req.files[keys].filename)
    })
    res.json({
    msg: 'File successfully inserted!',
    file: req.files,
  })
})

function csvToDb(csvUrl) {
  let stream = fs.createReadStream(csvUrl)
  let collectionCsv = []
  let csvFileStream = csv
    .parse()
    .on('data', function (data) {
      collectionCsv.push(data)
    })
    .on('end', function () {
      collectionCsv.shift()
      db.connect((error) => {
        if (error) {
          console.error(error)
        } else {
          let query = 'INSERT INTO users (id, name, email, phone_no) VALUES ?'
          db.query(query, [collectionCsv], (error, res) => {
            console.log(error || res)
          })
        }
      })
      fs.unlinkSync(csvUrl)
    })
  stream.pipe(csvFileStream)
}
const PORT = process.env.PORT || 5555
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})