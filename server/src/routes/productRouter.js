const express = require('express')

const { productController } = require('../controllers')
const { createProduct, deleteProduct, dispenseProduct, getProducts, updateProduct } = productController

const productRouter = express.Router({ mergeParams: true });

productRouter.delete('/delete/:productId', deleteProduct)
productRouter.get('/', getProducts)
productRouter.post('/create', createProduct)
productRouter.put('/dispense', dispenseProduct)
productRouter.put('/update', updateProduct)

module.exports = productRouter