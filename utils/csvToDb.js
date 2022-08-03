const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');
const FileUpload = require('../models/FileUpload')

async function csvToDb(csvUrl) {
  console.log('path=>', csvUrl)
    let stream = fs.createReadStream(csvUrl)
    let collectionCsv = []
    let csvFileStream = csv
      .parse()
      .on('data', function (data) {
        collectionCsv.push(data)
      })
      .on('end', function () {
        collectionCsv.shift()
        FileUpload.create(collectionCsv);
        fs.unlinkSync(csvUrl)
      })
    stream.pipe(csvFileStream)
  }

  module.exports = csvToDb;