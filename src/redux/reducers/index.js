import { combineReducers } from "redux";
import {drawingReducer } from "./drawing.reducer"
import {toolReducer} from './tool.reducer'

export const rootReducer = combineReducers({
    drawingReducer,
    toolReducer,
})