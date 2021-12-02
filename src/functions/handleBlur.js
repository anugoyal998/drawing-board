import {setAction} from '../redux/actions/action.action'
import {setSelectedElement} from '../redux/actions/selectedElement.action'
import { updateElement } from '../utils/helper'

export const handleBlur = (event,elements,setElements,selectedElement,dispatch)=> {
    const {id,x1,y1,type} = selectedElement
    dispatch(setAction('none'))
    dispatch(setSelectedElement(null))
    updateElement(id,x1,y1,null,null,type,elements,setElements,{text: event.target.value})
}

