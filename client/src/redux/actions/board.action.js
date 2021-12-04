import * as actionTypes from '../types'

export const setAllBoards = (boards)=> {
    return {
        type: actionTypes.SET_ALL_BOARDS,
        payload:boards
    }
}

export const setSelectedBoard = (selectedBoard)=> {
    return {
        type: actionTypes.SET_SELECTED_BOARD,
        payload:selectedBoard
    }
}