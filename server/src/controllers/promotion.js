const { Promotions } = require('../models')
const { catchErr } = require('../utils')

const createPromotion = async (req, res) => {
    try {
        const { discount, endDate, productId, startDate } = req.body.promotion
        const newPromotion = await Promotions.create({ discount, endDate, productId, startDate })
        res.status(200).json(newPromotion)
    } catch (err) {
        return catchErr(err, res)
    }
}

const deletePromotion = async (req, res) => {
    try {
        const { promotionId } = req.params
        const deletePromotion = await Promotions.destroy({ where: { promotionId } })
        res.status(204).json(deletePromotion)
    } catch (err) {
        return catchErr(err, res)
    }
}

const getPromotions = async (req, res) => {
    try {
        let allPromotions;

        if (Object.keys(req.query).length) {
            const { endDate, startDate } = req.query
            allPromotions = await Promotions.findAll({ where: { startDate, endDate } })
        } else {
            allPromotions = await Promotions.findAll()
        }

        res.status(200).json(allPromotions)
    } catch (err) {
        return catchErr(err, res)
    }
}

const updatePromotion = async (req, res) => {
    try {
        const { discount, endDate, startDate } = req.body
        const updatedPromotion = await Promotions.update({ discount, endDate, startDate }, { where: { promotionId } })
        res.status(200).json(updatedPromotion)
    } catch (err) {
        return catchErr(err, res)
    }
}

module.exports = {
    createPromotion,
    deletePromotion,
    getPromotions,
    updatePromotion
}