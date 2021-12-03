import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import rough from "roughjs/bundled/rough.esm";
import { jsPDF } from "jspdf";
import { drawElement } from "../../utils/helper1";


export const TopLeft = ({ setElements, elements, canvasRef}) => {
  const handleSaveCanvas = ()=> {
    const canvas = canvasRef?.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      // if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
    const pdf = new jsPDF()
    const imgData = canvas.toDataURL("image/jpeg")
    pdf.addImage(imgData,'JPEG',0,0,1350,750)
    pdf.save('download.pdf')
  }
  return (
    <div className="absolute top-0 left-0 m-1 rounded-md shadow-md p-2 z-10">
      <div className="flex space-x-3">
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md" onClick={()=> setElements([])} >
          <AiOutlineDelete className="text-2xl" />
        </div>
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md" onClick={handleSaveCanvas} >
          <FaRegSave className="text-2xl" />
        </div>
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <MdDarkMode className="text-2xl" />
        </div>
      </div>
    </div>
  );
};
