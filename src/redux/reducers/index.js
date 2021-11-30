import { combineReducers } from "redux";
import {actionReducer} from "./action.reducer"
import {toolReducer} from './tool.reducer'
import {selectedElementReducer} from './selectedElement.reducer'

export const rootReducer = combineReducers({
    actionReducer,
    toolReducer,
    selectedElementReducer,
})