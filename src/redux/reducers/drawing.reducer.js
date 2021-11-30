import * as actionTypes from '../types'

const inital = {
    drawing: false
}

export const drawingReducer = (state=inital,{type,payload})=> {
    switch(type) {
        case actionTypes.SET_DRAWING:
            return {...state,drawing: payload}
        default:
            return state
    }
}