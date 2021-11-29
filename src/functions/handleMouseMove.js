import { createElement } from "./createElement";

export const handleMouseMove = (action,event,elements,setElements) => {
  if (action !== "drawing") return;
  const { clientX, clientY } = event;
  const index = elements.length - 1;
  const { x1, y1 } = elements[index];
  const updatedElement = createElement(x1, y1, clientX, clientY);
  const elementsCopy = [...elements];
  elementsCopy[index] = updatedElement;
  setElements(elementsCopy);
};
