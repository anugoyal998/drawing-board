import React from "react";
import { GrCursor } from "react-icons/gr";
import { BsFillSquareFill, BsFillCircleFill, BsImage } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { ImTextColor } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setTool } from "../redux/actions/tool.action";

const arr = [
  { icon: <GrCursor className="text-2xl" />, title: "cursor" },
  { icon: <BsFillSquareFill className="text-2xl" />, title: "rectangle" },
  { icon: <BsFillCircleFill className="text-2xl" />, title: "circle" },
  { icon: <AiOutlineLine className="text-2xl" />, title: "line" },
  { icon: <FaPencilAlt className="text-2xl" />, title: "pencil" },
  { icon: <ImTextColor className="text-2xl" />, title: "text" },
  { icon: <BsImage className="text-2xl" />, title: "img" },
];

export const Toolbar = () => {
  const dispatch = useDispatch();
  const tool = useSelector((state) => state.toolReducer.tool);
  return (
    <div
      className="absolute top-0 bg-white m-1 rounded-md shadow-md p-2 z-10 flex space-x-3"
      style={{ left: "40vw" }}
    >
      {arr.map((e, key) => {
        if (e.title !== tool) {
          return (
            <div
              key={key}
              className={`cursor-pointer p-1 bg-gray-100 rounded-md hover:bg-white transform hover:scale-110`}
              onClick={() => dispatch(setTool(e.title))}
            >
              {e.icon}
            </div>
          );
        } else {
          return (
            <div
              key={key}
              className={`cursor-pointer p-1 bg-white scale-110 transform rounded-md`}
              onClick={() => dispatch(setTool(e.title))}
            >
              {e.icon}
            </div>
          );
        }
      })}
    </div>
  );
};
