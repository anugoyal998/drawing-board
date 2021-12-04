import rough from "roughjs/bundled/rough.esm";
import { drawElement } from "../../../utils/helper1";

export const getBoardImg = async (props)=> {
    const {board_data} = props;
    const elements = board_data
    const canvas = document.getElementById("card_canvas");
    const context = canvas?.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas)
    elements.forEach((element) => {
        drawElement(roughCanvas,context,element)
    })
    const imgData = canvas.toDataURL("image/png")
    return imgData
}