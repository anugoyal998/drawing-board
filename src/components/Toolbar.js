import React from "react";
import { GrCursor } from "react-icons/gr";
import { BsFillSquareFill, BsFillCircleFill } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { ImTextColor } from "react-icons/im";
import { BiSelection } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setTool } from "../redux/actions/tool.action";
import { useWindowSize } from "../hooks/useWindowSize";

const arr = [
  { icon: <GrCursor className="text-2xl" />, title: "cursor" },
  { icon: <BsFillSquareFill className="text-2xl" />, title: "rectangle" },
  { icon: <BsFillCircleFill className="text-2xl" />, title: "circle" },
  { icon: <AiOutlineLine className="text-2xl" />, title: "line" },
  { icon: <FaPencilAlt className="text-2xl" />, title: "pencil" },
  { icon: <ImTextColor className="text-2xl" />, title: "text" },
  { icon: <BiSelection className="text-2xl" />, title: "selection" },
];

export const Toolbar = () => {
  const dispatch = useDispatch();
  const tool = useSelector((state) => state.toolReducer.tool);
  const width = useWindowSize()
  return (
    <div
      className="absolute top-0 bg-white m-1 rounded-md shadow-md p-2 z-10 flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0"
      style={{ left: width >= 768 ? "40vw" : "90vw" }}
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
