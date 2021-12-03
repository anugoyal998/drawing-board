import { setAction } from "../redux/actions/action.action";
import { setSelectedElement } from "../redux/actions/selectedElement.action";
import { adjustElementCoordinates, updateElement } from "../utils/helper";

const adjustmentRequired = (type) =>
  ["line", "rectangle", "circle"].includes(type);

export const handleMouseUp = (
  event,
  dispatch,
  action,
  elements,
  setElements,
  selectedElement
) => {
  const { clientX, clientY } = event;
  if (selectedElement) {
    if (
      selectedElement.type === "text" &&
      clientX - selectedElement.offsetX === selectedElement.x1 &&
      clientY - selectedElement.offsetY === selectedElement.y1
    ) {
      dispatch(setAction("writing"));
      return;
    }
    const index = selectedElement.id;
    const { id, type } = elements[index];
    if (
      (action === "drawing" || action === "resizing") &&
      adjustmentRequired(type)
    ) {
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, type, elements, setElements);
    }
  }
  if (action === "writing") return;
  dispatch(setAction("none"));
  dispatch(setSelectedElement(null));
};
