var express = require('express');
var router = express.Router();

const fs = require('fs');
const csv = require('fast-csv');
const mysql = require('mysql2')
const multer = require('multer');
const path = require('path');

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

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('upload', { title: 'Express- upload' });
});

router.post('/',upload, (req, res) => {
  let path = __dirname.split('\\').slice(0,-1).join('\\')+ '\\uploads\\';
    Object.keys(req.files).map(keys=>{
        csvToDb(path + req.files[keys].filename)
    })
  //   res.json({
  //   msg: 'File successfully inserted!',
  //   file: req.files,
  // })
  
    res.render('message',{
    msg: 'File successfully inserted!',
    file: req.files,
  });
})

function csvToDb(csvUrl) {
  console.log('in=>', csvUrl)
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

module.exports = router;
