const router = require('express').Router();
const {userControler} = require('../controllers/controller.user');

router.get('/create', userControler.create)

module.exports =router