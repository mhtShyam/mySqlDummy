const express = require('express');
const app = express();

const PORT = process.env.PORT || 5050;

//DB connection
require('./src/database/connection')
require('./src/bootstrap')();

app.listen(PORT, ()=>{
    console.log(`Server up on port ${PORT}`)
})