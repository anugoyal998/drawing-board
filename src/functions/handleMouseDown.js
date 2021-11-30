import { setDrawing } from "../redux/actions/drawing.action";
import { createElement } from "./createElement";

export const handleMouseDown = (props) => {
  const { event, dispatch, setElements, tool } = props;
  dispatch(setDrawing(true));
  const { clientX, clientY } = event;
  const element = createElement({
    x1: clientX,
    y1: clientY,
    x2: clientX,
    y2: clientY,
    tool,
  });
  setElements((prev) => [...prev, element]);
};
