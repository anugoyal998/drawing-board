import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { handleMouseDown } from "../functions/handleMouseDown";
import { handleMouseMove } from "../functions/handleMouseMove";
import { handleMouseUp } from "../functions/handleMouseUp";

export const Canvas = ({canvasBg,setCanvasBg}) => {
    const [elements,setElements] = useState([])
    const [action,setAction] = useState('')
    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas)
        elements.forEach(element => {
            roughCanvas.draw(element?.roughElement)
        })
    },[elements])
    const handleMouseDownClick = (event) => {
        handleMouseDown(setAction, event, setElements)
    }
    const handleMouseMoveClick = (event) => {
        handleMouseMove(action,event,elements,setElements)
    }
    const handleMouseUpClick = () => {
        handleMouseUp(setAction)
    }

  return (
    <canvas
      id="canvas"
      className="w-screen h-screen z-0"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDownClick}
      onMouseMove={handleMouseMoveClick}
      onMouseUp={handleMouseUpClick}
    ></canvas>
  );
};
