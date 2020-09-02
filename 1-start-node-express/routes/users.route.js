const express = require('express')

const router = express.Router()

const controllers = require('../controllers/users.controller')

router.get('/', controllers.index)

router.get('/:id', controllers.id)

router.get('/search', controllers.search)

router.get('/create', controllers.create)

router.post('/create', controllers.postCreate)

module.exports = router
