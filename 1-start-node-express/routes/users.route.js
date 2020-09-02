const express = require('express')
const multer = require('multer')

const router = express.Router()

const controllers = require('../controllers/users.controller')
const validate = require('../validate/users.validate')

var upload = multer({ dest: './public/uploads/' })

router.get('/', controllers.index)

// router.get('/:id', controllers.id)

router.get('/cookie', (req, res, next) => {
  res.send('Demo cookie')
})

router.get('/search', controllers.search)

router.get('/create', controllers.create)

router.post('/create', upload.single('avatar'), validate.postCreate, controllers.postCreate)

module.exports = router
