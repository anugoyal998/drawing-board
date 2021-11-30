import { createElement } from "../utils/helper";

export const handleMouseMove = (action,event,elements,setElements,tool) => {
  if (action !== "drawing") return;
  const { clientX, clientY } = event;
  const index = elements.length - 1;
  const { x1, y1 } = elements[index];
  const updatedElement = createElement(x1, y1, clientX, clientY,tool);
  const elementsCopy = [...elements];
  elementsCopy[index] = updatedElement;
  setElements(elementsCopy);
};