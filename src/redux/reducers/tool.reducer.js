import * as actionTypes from '../types'

const inital = {
    tool: 'cursor'
}

export const toolReducer = (state=inital,{type,payload})=> {
    switch(type) {
        case actionTypes.SET_TOOL:
            return {...state, tool: payload}
        default:
            return state
    }
}