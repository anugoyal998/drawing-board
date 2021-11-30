import * as actionTypes from '../types'

export const setSelectedElement = (element)=> {
    return{
        type: actionTypes.SET_SELECTED_ELEMENT,
        payload: element
    }
}