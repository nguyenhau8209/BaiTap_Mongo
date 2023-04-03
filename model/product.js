const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    price : {
        type: Number,
        require: true,
        default: 0
    },
    soluong : {
        type: Number,
        default: 0
    }
});
const productModel = mongoose.model('product', productSchema);

module.exports = productModel;