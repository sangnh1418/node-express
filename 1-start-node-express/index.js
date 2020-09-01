const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()
const port = 5000

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

app.set('views', './views')

app.set('view engine', 'pug')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.render('index', { title: 'node-express-coder-tokyo', message: 'Node Express' })
})

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: db.get("users").value()
  })
})

app.get('/users/search', (req, res) => {
  const { q } = req.query
  const matchUser = db.get("users").value().filter((user) => user.name.indexOf(q) !== -1)
  res.render('users/index', {
    users: matchUser
  })
})

app.get('/users/create', (req, res) => {
  res.render('users/create')
})

app.post('/users/create', (req, res) => {
  db.get("users").push(req.body).write()
  res.redirect('/users')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})