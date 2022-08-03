const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig')
const {logger} = require('../utils/loggerConfig')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


//get data
router.get('/', (req, res)=>{
    
    Gig.findAll().then(gigs=> {
        if(gigs){
        logger.info({url:req.originalUrl, message:"data recived.."});
        console.log('data=>', gigs)
        res.render('gigs',{
            gigs
        })
    }else{
        logger.error({url:req.originalUrl, message:'data not recived..'})
    }
    }).catch(error=>{
        logger.error({url:req.originalUrl, message:error})
    })
})

//add data 
router.get('/add', (req, res)=>{
    res.render('add');
})

router.post('/add', (req, res)=>{
    const data ={
        title:'Angular js',
        technologies:'javaScript',
        description:'xyzabcxyzabcxyzabc',
        budget:'$12300',
        contact_mail:'abc@gmail.com'
}

let {title, technologies, description,budget,contact_mail}= data;
Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_mail
}).then(gigs=> res.redirect('/gigs')).catch(error=> console.log("ERROR:", error))
})

module.exports = router;