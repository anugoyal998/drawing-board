import * as actionTypes from '../types'

const initial = {
    auth: null
}

export const authReducer = (state=initial,{type,payload})=> {
    switch(type){
        case actionTypes.SET_AUTH:
            return {...state,auth: payload}
        default:
            return state
    }
}