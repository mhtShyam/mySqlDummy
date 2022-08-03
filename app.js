const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('./utils/schedular')();
const handlebars = require('express-handlebars');


app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({
    defaultLayout:'main',
    layoutsDir:`${__dirname}/views/layouts`
})
)
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(cors());

var server = require('http').createServer(app);

var port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let obj={
        First:23,
        Second:34,
        Third:34
        };
        let objArr = [];
        for (const key in obj) {
            // if (Object.hasOwnProperty.call(object, key)) {
            //     const element = object[key];
                
            // }
            objArr.push(obj[key]);
        }
        console.log('obj=>', objArr)
    
    // res.render('main',{layout:'index'});
    res.send('index')
});

const userRouter = require('./routes/user.router');
const postRouter = require('./routes/post.router');
const contactInfoRouter = require('./routes/contact_info.router');
const uploadRouter = require('./routes/fileupload.router');

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/contactinfo',contactInfoRouter);
app.use('/uploadfile', uploadRouter);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})



server.listen(port);
console.log('App running on :>> ', port);
module.exports = app;