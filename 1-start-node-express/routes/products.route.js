const express = require('express')

const router = express.Router()

const controllers = require('../controllers/product.controller')

router.get('/', controllers.products)

module.exports = router
