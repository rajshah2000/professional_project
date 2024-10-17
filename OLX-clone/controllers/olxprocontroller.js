const olxpromodel = require('../models/olxpromodel');

const productList = async (req, res) => {
    const products = await olxpromodel.find();
    if (products) {
        res.json({ data: products, msg: "Product List Displayed Successfully!" });
    } else {
        res.json({ error: "Error fetching product list!" });
    }
};

const addProduct = async (req, res) => {
    const { productId, productName, price, description } = req.body;
    let product;
``
    if (productId) {
        product = await olxpromodel.findByIdAndUpdate(productId, {
            productName,
            price,
            description,
            updatedAt: Date.now()
        }, { new: true });
        if (product) {
            res.json({ msg: "Product updated successfully!", data: product });
        } else {
            res.json({ msg: "Product not found!" });
        }
    } else {
        product = new olxpromodel({
            productName,
            price,
            description
        });
        const savedProduct = await product.save();
        if (savedProduct) {
            res.json({ msg: "Product added successfully!", data: savedProduct });
        } else {
            res.json({ error: "Error adding product!" });
        }
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await olxpromodel.findByIdAndDelete(id);
    if (product) {
        res.json({ msg: "Product deleted successfully!" });
    } else {
        res.json({ msg: "Product not found!" });
    }
};

// Edit product
const editProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, price, description } = req.body;

    try {
        const updatedProduct = await olxpromodel.findByIdAndUpdate(
            id, 
            { 
                productName, 
                price, 
                description, 
                updatedAt: Date.now() 
            }, 
            { new: true }
        );

        if (updatedProduct) {
            res.json({ msg: "Product updated successfully!", data: updatedProduct });
        } else {
            res.status(404).json({ msg: "Product not found!" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error updating product!", error });
    }
};

module.exports = { productList, addProduct, deleteProduct, editProduct };