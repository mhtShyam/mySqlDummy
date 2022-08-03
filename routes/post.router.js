const router = require('express').Router();
const {postController} = require('../controllers/controller.post');

router.get('/create', postController.create)

module.exports =router