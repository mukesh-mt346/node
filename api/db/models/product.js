const m = require('mongoose');
const p = m.Schema({
    _id: m.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, default: 0 }
}, {collection: 'productDB'});

module.exports = m.model('Product', p)