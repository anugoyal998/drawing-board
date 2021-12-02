import React, { useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";
import { handleMouseDown } from "../functions/handleMouseDown";
import { handleMouseMove } from "../functions/handleMouseMove";
import { handleMouseUp } from "../functions/handleMouseUp";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "../hooks/useHistory";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";
import { drawElement } from "../utils/helper1";
import { handleBlur } from "../functions/handleBlur";

export const Canvas = ({ canvasBg, setCanvasBg }) => {
  const textAreaRef = useRef();
  const [elements, setElements, undo, redo] = useHistory([]);
  const action = useSelector((state) => state.actionReducer.action);
  const tool = useSelector((state) => state.toolReducer.tool);
  const selectedElement = useSelector(
    (state) => state.selectedElementReducer.selectedElement
  );
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
  }, [elements, action, selectedElement]);
  useEffect(() => {
    const undoRedoFunction = (event) => {
      if (event.metaKey || (event.ctrlKey && event.key === "z")) {
        undo();
      }
      if (event.metaKey || (event.ctrlKey && event.key === "y")) {
        redo();
      }
    };
    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      textArea.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement]);
  const handleMouseDownClick = (event) => {
    handleMouseDown(event, setElements, dispatch, tool, elements, action);
  };
  const handleMouseMoveClick = (event) => {
    handleMouseMove(
      action,
      event,
      elements,
      setElements,
      tool,
      selectedElement
    );
  };
  const handleMouseUpClick = (event) => {
    handleMouseUp(
      event,
      dispatch,
      action,
      elements,
      setElements,
      selectedElement
    );
  };
  const handleBlurClick = (event) => {
    handleBlur(event, elements, setElements, selectedElement, dispatch);
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 flex items-center m-2 space-x-3 shadow-md bg-white p-2 rounded-md justify-center">
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <FaUndoAlt className="text-2xl" onClick={undo} />
        </div>
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <FaRedoAlt className="text-2xl" onClick={redo} />
        </div>
      </div>

      {action === "writing" && (
        <textarea
          onBlur={handleBlurClick}
          ref={textAreaRef}
          className="fixed m-0 p-0 outline-none"
          style={{
            top: selectedElement.y1 - 5,
            left: selectedElement.x1,
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
          }}
        />
      )}

      <canvas
        id="canvas"
        className="w-screen h-screen z-0"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDownClick}
        onMouseMove={handleMouseMoveClick}
        onMouseUp={handleMouseUpClick}
      ></canvas>
    </>
  );
};
