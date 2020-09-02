const express = require('express')

const router = express.Router()

const controllers = require('../controllers/users.controller')
const validate = require('../validate/users.validate')

router.get('/', controllers.index)

// router.get('/:id', controllers.id)

router.get('/cookie', (req, res, next) => {
  res.send('Demo cookie')
})

router.get('/search', controllers.search)

router.get('/create', controllers.create)

router.post('/create', validate.postCreate, controllers.postCreate)

module.exports = router
