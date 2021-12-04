import * as actionTypes from '../types'

const initial = {
    allBoards: [],
    selectedBoard: null
}

export const boardReducer = (state=initial,{type,payload}) => {
    switch(type) {
        case actionTypes.SET_ALL_BOARDS:
            return {...state,allBoards: payload}
        case actionTypes.SET_SELECTED_BOARD:
            return {...state,selectedBoard: payload}
        default:
            return state
    }
}