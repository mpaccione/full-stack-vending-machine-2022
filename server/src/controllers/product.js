const { Op } = require('sequelize')
const stream = require('stream')

const { Products, Promotions } = require('../models')
const { catchErr } = require('../utils')

const createProduct = async (req, res) => {
    try {
        const { currentInventory, description, maximumInventory, name, price } = req.body.product
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
        const { productId } = req.params
        const deleteProduct = await Products.destroy({ where: { productId } })
        res.status(204).json(deleteProduct)
    } catch (err) {
        return catchErr(err, res)
    }
}

const dispenseProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Products.findOne({ where: { productId } })
        const updatedProduct = await product.update({ currentInventory: --product.currentInventory })

        const readStream = new stream.PassThrough()
        readStream.end(Buffer.from(JSON.stringify(updatedProduct)))
        res.setHeader('Content-Disposition', `attachment; filename="${updatedProduct.name}.json"`)
        res.setHeader('Content-Type', 'text/json')
        readStream.pipe(res)
    } catch (err) {
        return catchErr(err, res)
    }
}

const getProducts = async (req, res) => {
    try {
        const productRes = {}
        if (req.query?.promotions == 'true') {
            // gets active promotions
            const currentDate = new Date()
            const promotions = await Promotions.findAll({
                where: {
                    startDate: { [Op.lt]: currentDate },
                    endDate: { [Op.gt]: currentDate }
                }
            })
            // convert to promotion object with productId as key
            productRes.promotions = {}
            promotions.forEach(promo => {
                productRes.promotions[promo.productId] = promo
            })
        }
        
        productRes.products = await Products.findAll()
        res.status(200).json(productRes)
    } catch (err) {
        return catchErr(err, res)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { currentInventory, description, maximumInventory, name, price, productId } = req.body.product
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