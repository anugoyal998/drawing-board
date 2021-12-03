import * as actionTypes from '../types'

const initial = {
    board: []
}

export const boardReducer = (state=initial,{type,payload})=> {
    switch(type) {
        case actionTypes.SET_BOARD:
            return {...state, board: payload}
        default:
            return state
    }
}