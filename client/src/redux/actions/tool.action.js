import * as actionTypes from '../types'

export const setTool = (tool) => {
    return {
        type: actionTypes.SET_TOOL,
        payload: tool
    }
}