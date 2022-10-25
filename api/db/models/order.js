const m = require('mongoose');
// const Product = require("../../db/models/product");
const ProductSchema = {productId:{ type:m.Schema.Types.ObjectId, required: true, ref: 'Product'}, quantity: { type: Number, default: 1 }}

const O = m.Schema({
    _id: m.Schema.Types.ObjectId,
    products: [ProductSchema]
    // products: [{ type:m.Schema.Types.ObjectId, required: true, ref: 'Product'}],
    // product: { type:m.Schema.Types.ObjectId, required: true, ref: 'Product'},

}, {collection: 'orderDB'});


module.exports = m.model('Order', O)