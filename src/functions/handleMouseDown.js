import { createElement } from "../utils/helper";
import {setAction} from '../redux/actions/action.action'

export const handleMouseDown = (event, setElements,dispatch,tool) => {
  dispatch(setAction("drawing"))
  const { clientX, clientY } = event;
  const element = createElement(clientX, clientY, clientX, clientY,tool);
  setElements((prev) => [...prev, element]);
};