const router = require('express').Router();
const {contactController} = require('../controllers/controller.contact_info');

router.get('/create', contactController.create)

module.exports =router