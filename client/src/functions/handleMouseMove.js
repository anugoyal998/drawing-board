import {
  cursorForPosition,
  getElementAtPosition,
  updateElement,
} from "../utils/helper";
import { resizedCoordinates } from "../utils/helper1";

export const handleMouseMove = (
  action,
  event,
  elements,
  setElements,
  tool,
  selectedElement
) => {
  const { clientX, clientY } = event;

  if (tool === "selection") {
    const element = getElementAtPosition(clientX, clientY, elements);
    event.target.style.cursor = element
      ? cursorForPosition(element.position)
      : "default";
  }

  if (action === "drawing") {
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    updateElement(index, x1, y1, clientX, clientY, tool, elements, setElements);
  } else if (action === "moving") {
    const { id, x1, x2, y1, y2, type } = selectedElement;
    const width = x2 - x1;
    const height = y2 - y1;
    const options = type === "text" ? { text: selectedElement.text } : {};
    updateElement(
      id,
      clientX,
      clientY,
      clientX + width,
      clientY + height,
      type,
      elements,
      setElements,
      options
    );
  } else if (action === "resizing") {
    const { id, type, position, ...coordinates } = selectedElement;
    const { x1, y1, x2, y2 } = resizedCoordinates(
      clientX,
      clientY,
      position,
      coordinates
    );
    updateElement(id, x1, y1, x2, y2, type, elements, setElements);
  }
};
