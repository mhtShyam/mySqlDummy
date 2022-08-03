//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
const { response } = require('express');
const axios = require('axios').default;
const app = express();


//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
  axios.get('http://localhost:8081/user').then(response=>{
    res.render('product_view',{
      results: response.data
    });
  }).catch(err=>{
    res.send({
      message:err
    })
  })
});

//route for insert data
app.post('/save', async (req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  const result = await axios.post('http://localhost:8081/user',{...data})
  if(result){
    res.redirect('/');
  }
 });

//route for update data
app.post('/update', async(req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    const result = await axios.post(`http://localhost:8081/user/${req.body.product_id}`,data)
    if(result){
      res.redirect('/');
    }else{
      res.send(req.body)
    }
  
});
// 
//route for delete data
app.get('/delete/:product_id', async(req, res) => {
  const result = await axios.delete(`http://localhost:8081/user/${req.params.product_id}`);
  if(result){
    res.redirect('/');
  }
  });

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
