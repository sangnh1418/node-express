const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  image: String,
  description: String
});

const ProductModels = mongoose.model('Product', productsSchema, 'products');

module.exports = ProductModels;