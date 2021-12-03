import * as actionTypes from '../types'

export const setAuth = (auth) => {
    return{
        type: actionTypes.SET_AUTH,
        payload: auth
    }
}