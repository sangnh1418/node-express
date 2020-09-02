const db = require("../db")

module.exports.products = (req, res) => {
  const perPage = 8
  const page = parseInt(req.query.page) || 1

  const start = (page - 1) * perPage
  const end = page * perPage

  const productData = db.get("products").value()
  res.render('products/index', {
    productData: productData.slice(start, end)
  })
}