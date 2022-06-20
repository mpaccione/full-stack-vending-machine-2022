const { Promotion } = require('../models')
const { catchErr } = require('../utils')

const createPromotion = async (req, res) => {
    try {
        const { discount, endDate, startDate } = req.body
        const newPromotion = await new Promotion({ discount, endDate, startDate }).save()
        res.status(200).json(newPromotion)
    } catch (err) {
        return catchErr(err)
    }
}

const deletePromotion = async (req, res) => {
    try {
        const deletePromotion = await Promotion.destroy({ where: { promotionId: req.body.id } })
        res.status(200).json(deletePromotion)
    } catch (err) {
        return catchErr(err)
    }
}

const getPromotions = async (req, res) => {
    try {
        const Promotions = await Promotion.findAll()
        res.status(200).json(Promotions)
    } catch (err) {
        return catchErr(err)
    }
}

const updatePromotion = async (req, res) => {
    try {
        const { discount, endDate, startDate } = req.body
        const updatedPromotion = await Promotion.update({ discount, endDate, startDate }, { where: { promotionId } })
        res.status(200).json(updatedPromotion)
    } catch (err) {
        return catchErr(err)
    }
}

module.exports = {
    createPromotion,
    deletePromotion,
    getPromotions,
    updatePromotion
}