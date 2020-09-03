require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 5000

const userRoute = require("./routes/users.route")
const authRoute = require("./routes/auth.route")
const productsRoute = require("./routes/products.route")
const cartRoute = require("./routes/cart.route")

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

app.set('views', './views')

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET))

app.use(sessionMiddleware)

app.get('/', (req, res) => {
  res.render('index', { title: 'node-express-coder-tokyo', message: 'Home' })
})

app.use("/users", authMiddleware.requiredMiddleware, userRoute)
app.use("/login", authRoute)
app.use("/products", productsRoute)
app.use("/cart", cartRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})