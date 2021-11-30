import { getElementAtPosition, updateElement } from "../utils/helper";


export const handleMouseMove = (action,event,elements,setElements,tool,selectedElement) => {
  const { clientX, clientY } = event;


  if(tool === "selection"){
    event.target.style.cursor = getElementAtPosition(clientX,clientY,elements) ? "move" : "default"
  }

  if(action === "drawing"){
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    updateElement(index,x1,y1,clientX,clientY,tool,elements,setElements);
  }else if(action === "moving"){
    const {id,x1,x2,y1,y2,type} = selectedElement
    const width = x2-x1
    const height = y2-y1
    updateElement(id,clientX,clientY,clientX+width,clientY+height,type,elements,setElements)
  }
};