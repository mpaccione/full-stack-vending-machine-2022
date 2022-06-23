const express = require('express')

const { promotionController } = require('../controllers')
const { createPromotion, deletePromotion, getPromotions, updatePromotion } = promotionController

const promotionRouter = express.Router({ mergeParams: true });

promotionRouter.delete('/delete', deletePromotion)
promotionRouter.get('/', getPromotions)
promotionRouter.post('/create', createPromotion)
promotionRouter.put('/update', updatePromotion)

module.exports = promotionRouter