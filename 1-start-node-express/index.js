const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const app = express()
const port = 5000

const userRoute = require("./routes/users.route")
const authRoute = require("./routes/auth.route")

const authMiddleware = require('./middlewares/auth.middleware')

app.set('views', './views')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('index', { title: 'node-express-coder-tokyo', message: 'Home' })
})

app.use("/users", authMiddleware.requiredMiddleware, userRoute)
app.use("/login", authRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})