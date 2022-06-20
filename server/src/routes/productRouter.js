const express = require('express')

const { productController } = require('../controllers')
const { createProduct, deleteProduct, getProducts, updateProduct } = productController

const productRouter = express.Router({ mergeParams: true });

productRouter.delete('/', deleteProduct)
productRouter.get('/', getProducts)
productRouter.post('/', createProduct)
productRouter.put('/', updateProduct)

module.exports = productRouter