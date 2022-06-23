import { get, put } from '../../../../api'
import { dispenseSoda, setSodas } from '../../../../redux/sodaSlice'

const getInventory = () => async dispatch => {
    try {
        console.log('getInventory')
        const res = await get('/products')
        console.log({ res })
        dispatch(setSodas(res))
    } catch (err) {
        alert(JSON.stringify(err))
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