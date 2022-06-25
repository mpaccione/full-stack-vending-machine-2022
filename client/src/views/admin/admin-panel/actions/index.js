import { get, del, post, put } from '../../../../api'

import { addPromo, addSoda, deletePromo, deleteSoda, setAllPromotions, setCurrentPromotions, updateSoda, updatePromo } from '../../../../redux/sodaSlice'

const createProduct = product => async dispatch => {
    try {
        const res = await post('/products/create', { product })
        if (res.data) {
            await dispatch(addSoda(res.data))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const createPromotion = promotion => async dispatch => {
    try {
        const res = await post('/promotions/create', { promotion })
        if (res.data) {
            await dispatch(addPromo(res.data))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const deleteProduct = productId => async dispatch => {
    try {
        const res = await del(`/products/delete/${productId}`)
        if (res.status === 204) {
            await dispatch(deleteSoda(productId))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const deletePromotion = promotionId => async dispatch => {
    try {
        const res = await del(`/promotions/delete/${promotionId}`)
        if (res.status === 204) {
            await dispatch(deletePromo(promotionId))
            return true
        }
        return false
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
        if (res.data) {
            await dispatch(updateSoda(product))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

const updatePromotion = promotion => async dispatch => {
    try {
        const res = await put('/promotions/update', { promotion })
        if (res.data) {
            await dispatch(updatePromo(promotion))
            return true
        }
        return false
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