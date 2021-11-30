import * as actionTypes from '../types'

const inital = {
    action: "none"
}

export const actionReducer = (state=inital,{type,payload})=> {
    switch(type) {
        case actionTypes.SET_ACTION:
            return {...state,action: payload}
        default:
            return state
    }
}