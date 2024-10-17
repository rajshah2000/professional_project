const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
        productName: String,
        price: Number,
        description: String,
        updatedAt: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('Product', productSchema);