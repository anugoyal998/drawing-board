import React, { useEffect, useState } from "react";
import { getBoardImg } from "./functions/getBoardImg";
import {BiDotsVerticalRounded} from 'react-icons/bi'
import Moment from "react-moment";


export const Card = (props) => {
  const [img, setImg] = useState(null);
  useEffect(async () => {
    const rsp = await getBoardImg(props.e);
    setImg(rsp);
  }, []);
  return (
    <div className="w-64 h-56 border-2 rounded-md m-2 cursor-pointer">
      <canvas
        id="card_canvas"
        className="w-screen h-screen hidden"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {img && <img id="card_img" src={img} className="bg-white h-40 border-b-2 w-full" />}
      <div className="p-1">
        <p className="text-gray-600 font-semibold">{props?.e?.board_name}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <p>logo</p> */}
            <Moment fromNow >{props?.e?.createdAt}</Moment>
          </div>
          <div><BiDotsVerticalRounded className="text-xl" /></div>
        </div>
      </div>
    </div>
  );
};
