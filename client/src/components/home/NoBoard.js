import React from "react";
import {AiFillPlusCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'


export const NoBoard = () => {
  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen flex flex-col justify-center items-center"
      style={{ zIndex: -1 }}
    >
      <p className="font-semibold text-lg text-gray-600">
        You don't have any Board yet
      </p>
      <p className="text-gray-600 flex items-center">
        Tap{" "}
        <Link to="/new-board" className="mx-1 outline-none focus:outline-none transform hover:scale-110">
          <AiFillPlusCircle className="text-3xl" />
        </Link>{" "}
        to create one
      </p>
    </div>
  );
};
