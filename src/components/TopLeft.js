import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

export const TopLeft = ({ canvasBg, setCanvasBg }) => {
  return (
    <div className="absolute top-0 left-0 m-1 rounded-md shadow-md p-2 z-10">
      <div className="flex space-x-3">
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <AiOutlineDelete className="text-2xl" />
        </div>
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <FaRegSave className="text-2xl" />
        </div>
        <div className="transform hover:bg-white hover:scale-110 cursor-pointer p-1 bg-gray-100 rounded-md">
          <MdDarkMode className="text-2xl" />
        </div>
      </div>
    </div>
  );
};
