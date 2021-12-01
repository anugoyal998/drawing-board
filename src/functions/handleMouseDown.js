import { createElement, getElementAtPosition } from "../utils/helper";
import {setAction} from '../redux/actions/action.action'
import {setSelectedElement} from '../redux/actions/selectedElement.action'

export const handleMouseDown = (event, setElements,dispatch,tool,elements) => {
  const { clientX, clientY } = event;
  if(tool === "selection"){
    const element = getElementAtPosition(clientX,clientY,elements);
    if(element){
      if(element.type === "pencil"){
        const xOffsets = element.points.map(point=> clientX - point.x)
        const yOffsets = element.points.map(point=> clientY - point.y)
        dispatch(setSelectedElement({...element, xOffsets, yOffsets}));
      }else{
        const offsetX = clientX - element.x1
        const offsetY = clientY - element.y1
        dispatch(setSelectedElement({...element, offsetX, offsetY}));
      }
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
    dispatch(setAction("drawing"))
  }
};