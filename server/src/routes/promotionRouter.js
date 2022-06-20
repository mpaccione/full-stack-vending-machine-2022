const express = require('express')

const { promotionController } = require('../controllers')
const { createPromotion, deletePromotion, getPromotions, updatePromotion } = promotionController

const promotionRouter = express.Router({ mergeParams: true });

promotionRouter.delete('/', deletePromotion)
promotionRouter.get('/', getPromotions)
promotionRouter.post('/', createPromotion)
promotionRouter.put('/', updatePromotion)

module.exports = promotionRouter