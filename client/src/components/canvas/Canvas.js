import React, { useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";
import { handleMouseDown } from "../../functions/handleMouseDown";
import { handleMouseMove } from "../../functions/handleMouseMove";
import { handleMouseUp } from "../../functions/handleMouseUp";
import { useSelector, useDispatch } from "react-redux";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";
import { drawElement } from "../../utils/helper1";
import { handleBlur } from "../../functions/handleBlur";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import toast , {Toaster} from "react-hot-toast"
import {setTool} from '../../redux/actions/tool.action'
import {useDimensions} from '../../hooks/useDimensions'

export const Canvas = ({ elements, setElements, undo, redo }) => {
  const [width,height] = useDimensions()
  const textAreaRef = useRef();
  const canvasRef = useRef();
  const action = useSelector((state) => state.actionReducer.action);
  const tool = useSelector((state) => state.toolReducer.tool);
  const selectedElement = useSelector(
    (state) => state.selectedElementReducer.selectedElement
  );
  const dispatch = useDispatch();


  //restore from local storage
  useEffect(() => {
    const boardElement = JSON.parse(localStorage.getItem('board'));
    if(boardElement){
      setElements(boardElement)
      dispatch(setTool('line'))
      toast(
        "Your previous work was restored from your local storage",
        { duration: 3000 }
      )
    }
  },[dispatch])

  useLayoutEffect(() => {
    if (tool === "img" || tool === "cursor") return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
  }, [elements, action, selectedElement,tool]);

  const handleSaveCanvas = async (isSave=true) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      drawElement(roughCanvas, context, element);
    });
    const imgData = canvas.toDataURL("image/png");
    var a = document.createElement("a"); //Create <a>
    a.href = imgData;
    a.download = "Image.png"; //File name Here
    isSave && a.click(); //Downloaded file
  };

  useEffect(() => {
    if (tool === "img" || tool === "cursor") return;
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
  }, [undo, redo,tool]);
  
  useEffect(() => {
    if (tool === "img" || tool === "cursor") return;
    const textArea = textAreaRef.current;
    if (action === "writing") {
      textArea.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement,tool]);

  const handleMouseDownClick = (event) => {
    if (tool === "img" || tool === "cursor") return;
    handleMouseDown(event, setElements, dispatch, tool, elements, action);
  };

  const handleMouseMoveClick = (event) => {
    if (tool === "img" || tool === "cursor") return;
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
    if (tool === "img" || tool === "cursor") return;
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
    if (tool === "img" || tool === "cursor") return;
    handleBlur(event, elements, setElements, selectedElement, dispatch);
  };

  return (
    <>
    <Toaster/>
    {/* undo redo */}
      <div className="absolute bottom-0 left-0 flex items-center m-2 space-x-3 shadow-md bg-white p-2 rounded-md justify-center">
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <FaUndoAlt className="text-2xl" onClick={undo} />
        </div>
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <FaRedoAlt className="text-2xl" onClick={redo} />
        </div>
      </div>
    {/* undo redo */}

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

      {/* top left */}
      <div className="absolute top-0 left-0 m-1 rounded-md shadow-md p-2 z-10">
        <div className="flex space-x-3">
          <div
            className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md"
            onClick={() => setElements([])}
          >
            <AiOutlineDelete className="text-2xl" />
          </div>
          <div
            className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md"
            onClick={handleSaveCanvas}
          >
            <FaRegSave className="text-2xl" />
          </div>
          <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
            <MdDarkMode className="text-2xl" />
          </div>
        </div>
      </div>
      {/* top left */}

      <canvas
        ref={canvasRef}
        id="canvas"
        className="z-0 bg-white"
        width={width}
        height={height}
        onMouseDown={handleMouseDownClick}
        onMouseMove={handleMouseMoveClick}
        onMouseUp={handleMouseUpClick}
      ></canvas>
    </>
  );
};
