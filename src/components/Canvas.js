import React, { useLayoutEffect, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'
//redux
import {useDispatch,useSelector} from 'react-redux'
//redux
import {createElement} from '../functions/createElement'
import {handleMouseDown} from '../functions/handleMouseDown'
import {handleMouseMove} from '../functions/handleMouseMove'
import {handleMouseUp} from '../functions/handleMouseUp'
const generator = rough.generator()


export const Canvas = () => {
    const dispatch = useDispatch()
    const drawing = useSelector(state=> state.drawingReducer.drawing)
    const tool = useSelector(state=> state.toolReducer.tool)
    const [elements,setElements] = useState([])



    useLayoutEffect(()=> {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas)
        elements.forEach(element => {
            roughCanvas.draw(element?.roughElement)
        })
    },[elements])



    const handleMouseDownClick = (event)=> {
        handleMouseDown({event,dispatch,setElements,tool})
    }
    const handleMouseMoveClick = (event)=> {
        handleMouseMove({event,drawing,elements,setElements,tool})
    }
    const handleMouseUpClick = (event)=> {
        handleMouseUp({event,dispatch})
    }




    return (
        <canvas
        id="canvas"
        className="h-screen w-screen"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDownClick}
        onMouseMove={handleMouseMoveClick}
        onMouseUp={handleMouseUpClick}
        >canvas</canvas>
    )
}
