import * as actionTypes from '../types'

export const setBoard = (board) => {
    return{
        type: actionTypes.SET_BOARD,
        payload: board
    }
}