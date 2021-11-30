import * as actionTypes from '../types'

export const setDrawing = (drawing) => {
    return {
        type: actionTypes.SET_DRAWING,
        payload: drawing,
    }
}