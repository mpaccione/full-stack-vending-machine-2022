const { Products } = require('../models')
const { catchErr } = require('../utils')

const createProduct = async (req, res) => {
    try {
        const { currentInventory, description, maximumInventory, name, price } = req.body
        const newProduct = await new Products({
            currentInventory, description, maximumInventory, name, price
        }).save()
        res.status(200).json(newProduct)
    } catch (err) {
        return catchErr(err, res)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Products.destroy({ where: { productId: req.body.id } })
        res.status(200).json(deleteProduct)
    } catch (err) {
        return catchErr(err, res)
    }
}

const dispenseProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Products.findOne({ where: { productId } })
        const updatedProduct = await product.update({ currentInventory: --product.currentInventory })
        console.log({ updatedProduct })
        res.status(200).json(updatedProduct)
    } catch (err) {
        return catchErr(err, res)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll()
        res.status(200).json(products)
    } catch (err) {
        return catchErr(err, res)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { currentInventory, description, maximumInventory, name, price } = req.body
        const updatedProduct = await Products.update({
            currentInventory, description, maximumInventory, name, price
        }, { where: { productId } })
        res.status(200).json(updatedProduct)
    } catch (err) {
        return catchErr(err, res)
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    dispenseProduct,
    getProducts,
    updateProduct
}