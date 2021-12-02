import { createElement, getElementAtPosition } from "../utils/helper";
import {setAction} from '../redux/actions/action.action'
import {setSelectedElement} from '../redux/actions/selectedElement.action'

export const handleMouseDown = (event, setElements,dispatch,tool,elements,action) => {
  if(action === "writing")return
  const { clientX, clientY } = event;
  if(tool === "selection"){
    const element = getElementAtPosition(clientX,clientY,elements);
    if(element){
      const offsetX = clientX - element.x1
      const offsetY = clientY - element.y1
      dispatch(setSelectedElement({...element, offsetX, offsetY}));
      setElements(prevState=> prevState)
      if(element.position === "inside"){
        dispatch(setAction("moving"))
      }else{
        dispatch(setAction("resizing"))
      }
    }
  }else {
    const id = elements.length
    const element = createElement(id,clientX, clientY, clientX, clientY,tool);
    setElements((prev) => [...prev, element]);
    dispatch(setSelectedElement(element))
    dispatch(setAction(tool === "text" ? "writing" : "drawing"))
  }
};