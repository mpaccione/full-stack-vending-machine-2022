import { get } from '../../../../api'
import { setSodas } from '../../../../redux/sodaSlice'

const getInventory = () => async dispatch => {
    try {
        const res = await get('/products')
        console.log({ res })
        dispatch(setSodas(res))
    } catch (err) {
        alert('test')
        alert(JSON.stringify(err))
    }
}

export {
    getInventory,
}