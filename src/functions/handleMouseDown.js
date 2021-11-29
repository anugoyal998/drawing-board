import { createElement } from "./createElement";

export const handleMouseDown = (setAction, event, setElements) => {
  setAction("drawing");
  const { clientX, clientY } = event;
  const element = createElement(clientX, clientY, clientX, clientY);
  setElements((prev) => [...prev, element]);
};
