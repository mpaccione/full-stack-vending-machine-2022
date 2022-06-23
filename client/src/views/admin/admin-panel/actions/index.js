import { get, del, post, put } from '../../../../api'

import { setAllPromotions,  setCurrentPromotions, } from '../../../../redux/sodaSlice'

let productId, promotionId;

const createProduct = product => async dispatch => {
    try {
        const res = await post('/products/create', { product })
        return res.data ? res.data : false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const createPromotion = promotion => async dispatch => {
    try {
        const res = await post('/promotions/create', { promotion })
        return res.data ? res.data : false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const deleteProduct = productId = async dispatch => {
    try {
        const res = await del('/products/delete', { productId })
        return res.status === 201 
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const deletePromotion = promotionId = async dispatch => {
    try {
        const res = await del('/promotions/delete', { promotionId })
        return res.status === 201 
    } catch (err) {
        alert(JSON.stringify(err))
    }
}


const getAllPromotions = () => async dispatch => {
    try {
        const res = await get('promotions')
        dispatch(setAllPromotions(res))
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const getCurrentPromotions = (startDate, endDate) => async dispatch => {
    try {
        const res = await get(`promotions?startDate=${startDate}&endDate=${endDate}`)
        dispatch(setCurrentPromotions(res))
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const updateProduct = product => async dispatch => {
    try {
        const res = await put('/products/update', { product })
        return res.data ? res.data : false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const updatePromotion = promotion => async dispatch => {
    try {
        const res = await put('/promotions/update', { promotion })
        return res.data ? res.data : false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

export {
    createProduct,
    createPromotion,
    deleteProduct,
    deletePromotion,
    getCurrentPromotions,
    getAllPromotions,
    updateProduct,
    updatePromotion
}