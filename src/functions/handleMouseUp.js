import { setDrawing } from "../redux/actions/drawing.action";

export const handleMouseUp = (props) => {
  const { event, dispatch } = props;
  dispatch(setDrawing(false));
};
