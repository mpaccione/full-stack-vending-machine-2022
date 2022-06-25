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
            // updates the inventory count in client
            dispatch(dispenseSoda(res.data))

            // extract filename from header
            let filename = res.headers['content-disposition'].split('filename=')[1]
            filename = filename.replaceAll('/', '')
            filename = filename.replaceAll('"', '')

            const link = document.createElement('a')
            const temp = window.URL.createObjectURL(new Blob([JSON.stringify(res.data)]));

            // trigger download
            link.href = temp;
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click();

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