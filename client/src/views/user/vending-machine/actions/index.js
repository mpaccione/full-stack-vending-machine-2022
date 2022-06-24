import { get, put } from '../../../../api'
import { dispenseSoda, setCurrentPromotions, setSodas } from '../../../../redux/sodaSlice'

const getInventory = (promotions = false) => async dispatch => {
    try {
        const res = await get(`/products?promotions=${promotions}`)
        if (res) {
            dispatch(setSodas(res.products))
            res?.promotions && dispatch(setCurrentPromotions(res.promotions))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
        return false
    }
}

const requestSoda = productId => async dispatch => {
    try {
        const res = await put('/products/dispense', { productId })
        if (res.data) {
            dispatch(dispenseSoda(res.data))
            return true
        }
        return false
    } catch (err) {
        alert(JSON.stringify(err))
        return false
    }
}

export {
    getInventory,
    requestSoda
}