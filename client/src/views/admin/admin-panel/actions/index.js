import { del, post, put } from '../../../../api'

let productId;

const createProduct = product => async dispatch => {
    try {
        const res = await post('/products/create', { product })
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

const updateProduct = product => async dispatch => {
    try {
        const res = await put('/products/update', { product })
        return res.data ? res.data : false
    } catch (err) {
        alert(JSON.stringify(err))
    }
}

export {
    createProduct,
    deleteProduct,
    updateProduct,
}