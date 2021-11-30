import { createElement } from "./createElement";

export const handleMouseMove = (props) => {
  const { event, drawing, elements, setElements, tool } = props;
  if (!drawing) return;
  if (tool === "line" || tool === "rectangle") {
    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement({
      x1,
      y1,
      x2: clientX,
      y2: clientY,
      tool,
    });
    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  }
};
