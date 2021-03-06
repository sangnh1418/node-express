// const db = require("../db")
const Product = require("../models/products.model")

module.exports.products = async (req, res) => {
  const perPage = 8
  const page = parseInt(req.query.page) || 1

  const start = (page - 1) * perPage
  const end = page * perPage

  const pagination = [page, page + 1, page + 2]

  /*use lowdb */
  // const productData = db.get("products").value()
  // res.render('products/index', {
  //   productData: productData.slice(start, end),
  //   pagination: pagination,
  //   activePagination: page
  // })

  const productData = await Product.find()
  res.render('products/index', {
    productData: productData.slice(start, end),
    pagination,
    activePagination: page
  })
}