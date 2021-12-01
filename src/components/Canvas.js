import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { handleMouseDown } from "../functions/handleMouseDown";
import { handleMouseMove } from "../functions/handleMouseMove";
import { handleMouseUp } from "../functions/handleMouseUp";
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from '../hooks/useHistory'
import {FaUndoAlt,FaRedoAlt} from 'react-icons/fa'

export const Canvas = ({canvasBg,setCanvasBg}) => {
    const [elements,setElements,undo,redo] = useHistory([])
    const action = useSelector(state => state.actionReducer.action)
    const tool = useSelector(state => state.toolReducer.tool)
    const selectedElement = useSelector(state => state.selectedElementReducer.selectedElement)
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas)
        elements.forEach(element => {
            roughCanvas.draw(element?.roughElement)
        })
    },[elements])
    useEffect(()=> {
      const undoRedoFunction = (event) => {
        if(event.metaKey || event.ctrlKey && event.key === "z") {
            undo()
        }
        if(event.metaKey || event.ctrlKey && event.key === "y") {
          redo()
      }
      }
      document.addEventListener("keydown",undoRedoFunction)
      return ()=> {
        document.removeEventListener("keydown",undoRedoFunction)
      }
    },[undo,redo])
    const handleMouseDownClick = (event) => {
        handleMouseDown(event, setElements,dispatch,tool,elements)
    }
    const handleMouseMoveClick = (event) => {
        handleMouseMove(action,event,elements,setElements,tool,selectedElement)
    }
    const handleMouseUpClick = () => {
        handleMouseUp(dispatch,action,elements,setElements,selectedElement)
    }

  return (
    <>
    <div className="absolute bottom-0 left-0 flex items-center m-2 space-x-3 shadow-md bg-white p-2 rounded-md justify-center">
      <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md"><FaUndoAlt className="text-2xl" onClick={undo} /></div>
      <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md"><FaRedoAlt className="text-2xl" onClick={redo} /></div>
    </div>

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