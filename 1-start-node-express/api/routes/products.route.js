const express = require('express')

const router = express.Router()

const controllers = require('../controllers/products.controller')

router.get('/', controllers.products)

router.post('/', controllers.create)

module.exports = router
