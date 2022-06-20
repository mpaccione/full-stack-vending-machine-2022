const { Product } = require('../models')
const { catchErr } = require('../utils')

const createProduct = async (req, res) => {
    try {
        const { currentInventory, description, maximumInventory, name, price } = req.body
        const newProduct = await new Product({
            currentInventory, description, maximumInventory, name, price
        }).save()
        res.status(200).json(newProduct)
    } catch (err) {
        return catchErr(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.destroy({ where: { productId: req.body.id } })
        res.status(200).json(deleteProduct)
    } catch (err) {
        return catchErr(err)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).json(products)
    } catch (err) {
        return catchErr(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { currentInventory, description, maximumInventory, name, price } = req.body
        const updatedProduct = await Product.update({
            currentInventory, description, maximumInventory, name, price
        }, { where: { productId } })
        res.status(200).json(updatedProduct)
    } catch (err) {
        return catchErr(err)
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct
}