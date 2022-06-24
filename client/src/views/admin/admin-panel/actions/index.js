import { get, del, post, put } from '../../../../api'

import { addNewPromotion, deleteSoda, setAllPromotions, setCurrentPromotions, } from '../../../../redux/sodaSlice'

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
        if (res.data) {
            await dispatch(addNewPromotion(res.data))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const deleteProduct = productId => async dispatch => {
    try {
        console.log({ productId })
        const res = await del(`/products/delete/${productId}`)
        console.log({ res })
        return res.status == 201 ? dispatch(deleteSoda(productId)) : false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const deletePromotion = promotionId => async dispatch => {
    try {
        const res = await del('/promotions/delete', { promotionId })
        return res.status == 201 ? dispatch(deletePromotion(productId)) : false
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