import {setAction} from '../redux/actions/action.action'
import {setSelectedElement} from '../redux/actions/selectedElement.action'
import { adjustElementCoordinates, updateElement } from '../utils/helper'


export const handleMouseUp = (dispatch,action,elements,setElements,selectedElement)=> {
  if(action === "drawing" || action === "resizing"){
    const index = selectedElement.id;
    const { id,type } = elements[index];
    const {x1,y1,x2,y2} = adjustElementCoordinates(elements[index])
    updateElement(id,x1,y1,x2,y2,type,elements,setElements)
  }
  dispatch(setAction('none'))
  dispatch(setSelectedElement(null))
}