const express = require('express');
const db = require('./config/database')
const bodyparser = require('body-parser');
const Handlebars  = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const {logger, reqLogger} = require('./utils/loggerConfig');


const app = express();
app.use('/gigs', require('./routes/gigs'));
app.use(express.static(path.join(__dirname,'public')))

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set('view engine', 'handlebars')

app.use(bodyparser.urlencoded({
    extended:false
}))

const PORT = process.env.PORT || 8080;

db.authenticate().then(()=>{
    logger.info('connected to sql server.')
}).catch((error)=>{
    logger.error('Not connected to sql server');
})

app.get('/', (req, res)=> { 
    logger.info({apiUrl:req.originalUrl});
    res.render("index",{layout:'landing'})
});

app.listen(PORT,()=>{
    logger.log({
        level:'info', 
        message:`server up on port ${PORT}`
    })
});
