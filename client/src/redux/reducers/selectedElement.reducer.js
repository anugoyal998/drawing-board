import * as actionTypes from '../types'

const inital = {
    selectedElement: null
}

export const selectedElementReducer = (state =inital,{type,payload})=> {
    switch(type){
        case actionTypes.SET_SELECTED_ELEMENT:
            return {...state, selectedElement: payload}
        default:
            return state
    }
}